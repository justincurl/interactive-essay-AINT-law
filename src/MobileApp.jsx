import { useState, useCallback, useRef } from 'react';
import MobileNodeView from './components/MobileNodeView';
import MobileOverview from './components/MobileOverview';
import EvidenceModal from './components/EvidenceModal';
import ReformModal from './components/ReformModal';
import MobileLandingPage from './components/MobileLandingPage';
import { pathway1 } from './data/pathway1';
import { pathway2 } from './data/pathway2';
import { pathway3 } from './data/pathway3';
import { finalDestination } from './data/finalDestination';

const pathways = [pathway1, pathway2, pathway3];
const NODES_PER_PATHWAY = 3;
const ELEMENTS_PER_PATHWAY = 4; // 3 nodes + 1 reform
const TOTAL_ELEMENTS = pathways.length * ELEMENTS_PER_PATHWAY + 1; // +1 for final destination

// Build flat list of all content items for navigation
function buildContentList() {
  const items = [];

  pathways.forEach((pathway, pathwayIndex) => {
    // Add the 3 nodes
    pathway.nodes.forEach((node, nodeIndex) => {
      items.push({
        type: 'node',
        data: node,
        pathwayIndex,
        nodeIndex,
        isLastInRow: nodeIndex === NODES_PER_PATHWAY - 1,
      });
    });

    // Add reform after each pathway
    if (pathway.reform) {
      items.push({
        type: 'reform',
        data: pathway.reform,
        pathwayIndex,
        isLastInRow: true,
      });
    }
  });

  // Add final destination
  items.push({
    type: 'final',
    data: finalDestination,
    pathwayIndex: pathways.length,
    isLastInRow: true,
  });

  return items;
}

const contentList = buildContentList();

export default function MobileApp() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [showFullFlowchart, setShowFullFlowchart] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [evidenceNode, setEvidenceNode] = useState(null);
  const [evidenceSectionIndex, setEvidenceSectionIndex] = useState(null);
  const [showReformModal, setShowReformModal] = useState(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  // Swipe handling
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const currentItem = contentList[currentIndex];
  const isComplete = currentIndex >= contentList.length - 1;

  // Track if user has ever completed the journey
  if (isComplete && !hasCompletedOnce) {
    setHasCompletedOnce(true);
  }

  // Check if we're at the end of a row (after 3rd node - impact node)
  const isEndOfRow = currentItem?.isLastInRow && currentItem?.type !== 'reform';
  const shouldShowOverviewOption = isEndOfRow || currentItem?.type === 'final';

  const handleContinue = useCallback(() => {
    if (showOverview || showFullFlowchart) {
      setShowOverview(false);
      setShowFullFlowchart(false);
      if (currentIndex < contentList.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsExpanded(false);
      }
      return;
    }

    // If at end of row (impact node) or after reform, show overview
    if (shouldShowOverviewOption && !showOverview) {
      setShowOverview(true);
      return;
    }

    if (currentIndex < contentList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsExpanded(false);
    }
  }, [currentIndex, showOverview, showFullFlowchart, shouldShowOverviewOption]);

  const handleBack = useCallback(() => {
    if (showOverview) {
      setShowOverview(false);
      return;
    }

    if (showFullFlowchart) {
      setShowFullFlowchart(false);
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsExpanded(false);
    }
  }, [currentIndex, showOverview, showFullFlowchart]);

  const handleStartOver = useCallback(() => {
    setCurrentIndex(0);
    setShowOverview(false);
    setShowFullFlowchart(false);
    setIsExpanded(false);
  }, []);

  // Swipe gesture handling - only horizontal swipes, not taps
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    const deltaX = Math.abs(touchEndX.current - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    // Only consider it a swipe if horizontal movement is greater than vertical
    if (deltaX > 10 && deltaX > deltaY) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    // Only process as swipe if we detected horizontal swipe movement
    if (!isSwiping.current) {
      touchStartX.current = 0;
      touchEndX.current = 0;
      return;
    }

    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left → go forward
        handleContinue();
      } else {
        // Swiped right → go back
        handleBack();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    isSwiping.current = false;
  };

  // Handle evidence modal
  const handleShowEvidence = (node, sectionIndex = null) => {
    setEvidenceNode(node);
    setEvidenceSectionIndex(sectionIndex);
  };

  const handleCloseEvidence = () => {
    setEvidenceNode(null);
    setEvidenceSectionIndex(null);
  };

  // Handle reform modal (for viewing reform details)
  const handleShowReformDetails = () => {
    setShowReformModal(true);
  };

  const handleCloseReformModal = () => {
    setShowReformModal(false);
  };

  // Handle full flowchart view
  const handleShowFullFlowchart = () => {
    setShowFullFlowchart(true);
  };

  // Handle expand toggle from node view
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Handle node click from flowchart - navigate to that node
  const handleNodeClickFromFlowchart = (nodeIndex) => {
    setCurrentIndex(nodeIndex);
    setShowFullFlowchart(false);
    setShowOverview(false);
    setIsExpanded(false);
  };

  // Calculate progress
  const progress = ((currentIndex + 1) / contentList.length) * 100;

  // Get all items for full flowchart view
  const getAllItems = () => contentList;

  // Get visible items for overview (all items up to and including current index)
  const getOverviewItems = () => {
    if (!currentItem) return [];
    return contentList.slice(0, currentIndex + 1);
  };

  if (showLanding) {
    return <MobileLandingPage onExplore={() => setShowLanding(false)} />;
  }

  return (
    <div
      className="min-h-screen bg-cream flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="border-b border-border/30 bg-cream/90 backdrop-blur-sm sticky top-0 z-50 px-4 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowLanding(true)}
            className="text-xs font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Intro
          </button>
          <span className="text-[10px] font-semibold tracking-[0.04em] uppercase text-[#737373] text-center flex-1 mx-2 truncate">
            Interactive Essay: AI & Law
          </span>
          <span className="text-xs text-text-secondary/60">
            {currentIndex + 1}/{contentList.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent/70 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {showFullFlowchart ? (
          <MobileOverview
            items={hasCompletedOnce ? getAllItems() : getOverviewItems()}
            currentIndex={currentIndex}
            pathways={pathways}
            onContinue={() => setShowFullFlowchart(false)}
            isComplete={isComplete || hasCompletedOnce}
            isFullView={true}
            onNodeClick={handleNodeClickFromFlowchart}
          />
        ) : showOverview ? (
          <MobileOverview
            items={isComplete ? getAllItems() : getOverviewItems()}
            currentIndex={currentIndex}
            pathways={pathways}
            onContinue={handleContinue}
            isComplete={isComplete}
            isFullView={isComplete}
            onNodeClick={handleNodeClickFromFlowchart}
          />
        ) : (
          <MobileNodeView
            item={currentItem}
            isExpanded={isExpanded}
            onToggleExpand={handleToggleExpand}
            onShowEvidence={handleShowEvidence}
            onShowReformDetails={handleShowReformDetails}
            onShowFullFlowchart={handleShowFullFlowchart}
          />
        )}
      </main>

      {/* Navigation footer */}
      <footer className="border-t border-border/30 bg-cream/90 backdrop-blur-sm sticky bottom-0 z-50 safe-area-pb">
        {/* Attribution */}
        <div className="px-4 pt-2 text-center border-b border-border/20">
          <p className="text-[10px] text-[#737373]">
            This is an interactive version of a co-authored essay built by{' '}
            <a href="https://justincurl.github.io" className="text-[#C54B32] no-underline" target="_blank" rel="noopener noreferrer">Justin Curl</a>
            {' '}with{' '}
            <a href="https://devin.ai" className="text-[#C54B32] no-underline" target="_blank" rel="noopener noreferrer">Devin</a>
            {' '}and Claude Code
          </p>
        </div>
        {/* View Flowchart button - prominent, above nav */}
        {!showOverview && !showFullFlowchart && (
          <div className="px-4 pt-3 pb-2">
            <button
              onClick={handleShowFullFlowchart}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f5f5f4] hover:bg-[#e7e5e4] border border-border/50 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="text-sm font-medium">View Flowchart</span>
            </button>
          </div>
        )}

        {/* Back / Continue navigation */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0 && !showOverview && !showFullFlowchart}
            className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
              currentIndex === 0 && !showOverview && !showFullFlowchart
                ? 'text-text-secondary/30 cursor-not-allowed'
                : 'text-text-secondary hover:text-text-primary hover:bg-black/5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>

          <div className="text-center text-[10px] text-text-secondary/50 px-2">
            Swipe to navigate
          </div>

          {isComplete && !showOverview && !showFullFlowchart ? (
            <button
              onClick={() => setShowOverview(true)}
              className="flex items-center gap-1 px-4 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-black/5 transition-colors"
            >
              <span className="text-sm">Continue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : isComplete && showOverview ? (
            <button
              disabled
              className="flex items-center gap-1 px-4 py-2 rounded-md text-text-secondary/30 cursor-not-allowed"
            >
              <span className="text-sm">Continue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="flex items-center gap-1 px-4 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-black/5 transition-colors"
            >
              <span className="text-sm">Continue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </footer>

      {/* Evidence Modal */}
      {evidenceNode && (
        <EvidenceModal
          node={evidenceNode}
          sectionIndex={evidenceSectionIndex}
          onClose={handleCloseEvidence}
        />
      )}

      {/* Reform Modal */}
      {showReformModal && currentItem?.type === 'reform' && (
        <ReformModal
          reformNode={currentItem.data}
          onClose={handleCloseReformModal}
        />
      )}
    </div>
  );
}
