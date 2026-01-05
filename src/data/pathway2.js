export const pathway2 = {
  id: 'pathway2',
  nodes: [
    {
      id: 'p2-node1',
      type: 'starting',
      category: 'STARTING ASSUMPTION',
      title: 'AI adoption in legal contexts',
      subtitle: 'People are effectively using AI for legal work',
      explanation: [
        'Placeholder: Add 2-3 paragraphs explaining how AI tools are being adopted in legal contexts.',
        'Placeholder: Discuss the inputs/outputs/outcomes framework and why productivity doesn\'t equal better outcomes.',
      ],
      evidence: [
        {
          quote: 'Placeholder quote about AI adoption in legal work',
          source: 'Source citation',
        },
      ],
    },
    {
      id: 'p2-node2',
      type: 'bottleneck',
      category: 'BOTTLENECK',
      title: 'Adversarial dynamics',
      subtitle: 'Zero-sum processes in which the value of legal services is relative',
      explanation: [
        'Placeholder: Explain how adversarial dynamics work in legal contexts.',
        'Placeholder: Discuss how cost-imposition works as legal strategy.',
      ],
      evidence: [
        {
          quote: 'Placeholder quote about adversarial dynamics',
          source: 'Source citation',
        },
      ],
    },
    {
      id: 'p2-node3',
      type: 'impact',
      category: 'IMPACT WITHOUT REFORM',
      title: 'Productivity increases but doesn\'t lead to better outcomes',
      subtitle: 'Opposing parties locked into escalating arms races',
      explanation: [
        'Placeholder: Describe how digitization failed to reduce discovery costs.',
        'Placeholder: Explain the cautionary tale of how productivity gains were absorbed.',
      ],
      evidence: [
        {
          quote: 'Placeholder quote about productivity without better outcomes',
          source: 'Source citation',
        },
      ],
    },
  ],
  reform: {
    id: 'p2-reform',
    category: 'WITH REFORM',
    title: 'Procedural Reform',
    subtitle: 'Judges make litigation less adversarial; parties use arbitration as a parallel track',
    explanation: [
      'Placeholder: Discuss tools judges have to reduce adversarial dynamics.',
      'Placeholder: Describe how arbitration offers another path forward.',
    ],
    evidence: [
      {
        quote: 'Placeholder quote about reform options',
        source: 'Source citation',
      },
    ],
  },
};

export default pathway2;
