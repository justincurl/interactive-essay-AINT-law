export const pathway2 = {
  id: 'pathway2',
  nodes: [
    {
      id: 'p2-node1',
      type: 'starting',
      category: 'STATE OF THE WORLD',
      title: 'AI adoption in legal contexts',
      subtitle: 'People are effectively using AI for legal work',
      explanation: [
        'This pathway begins with a different starting condition: AI tools are widely used. In this world, lawyers regularly complete legal work more efficiently and/or individuals use AI to complete legal tasks. But productivity is not the same as outcomes.',
        'We argue that to understand AI\'s impact, we must distinguish inputs, outputs, and outcomes. Clients don\'t want more legal work done; they want their disputes resolved, their deals closed, their rights protected. In adversarial contexts, getting better at producing outputs doesn\'t necessarily make outcomes easier to achieve.',
      ],
      evidenceLabel: 'What\'s the difference between inputs, outputs, and outcomes? →',
      evidence: [
        {
          quote: 'Even in a world where AI increases lawyers\' productivity and completes legal tasks, it might not lower the costs of legal services. To see why, it is crucial to distinguish inputs and outputs from outcomes.',
          type: 'context',
        },
        {
          quote: '• Inputs: Employee talent, billable hours, technological tools\n• Outputs: Contracts drafted, motions filed, briefs written\n• Outcomes: Disputes resolved, deals closed, rights protected',
          label: 'The framework',
          isList: true,
        },
        {
          quote: 'Consumers purchase legal services to achieve specific outcomes. Inputs and outputs can indirectly lead to those outcomes because more hours worked and more legal tasks help clients get the outcomes they want. But in a zero-sum context where the value of legal services is relative, if both sides increase their outputs, the advantages to either side of doing so can be limited.',
          label: 'The risk',
        },
        {
          quote: 'Instead, AI might simply raise the inputs and outputs required to reach the same outcome, with productivity gains absorbed by greater production.',
          type: 'context',
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
        'Because legal outcomes often depend on relative rather than absolute quality, when both parties become more productive, the competitive equilibrium can simply shift upward. When both sides use advanced AI, achieving the same result, like settling favorably or prevailing at trial, could require more legal work.',
        'A billable hours pricing model can reinforce these dynamics: more hours worked means more revenue for firms, regardless of whether outcomes improve.',
      ],
      evidenceLabel: 'How does cost-imposition work as legal strategy? →',
      evidence: [
        {
          quote: 'It is a "core premise of litigation economics" that "all things being equal, the party facing higher costs will settle on terms more favorable to the party facing lower costs."',
          label: 'The economic logic',
        },
        {
          quote: 'Each side can leverage these features to impose costs on the other. A requesting party, through excessive requests, can compel their adversary to review more documents for confidentiality and relevance. And a reviewing party, through excessive production, can bury relevant information in mountains of extraneous material, forcing the opposing side to spend more time on review.',
          label: 'Discovery as the clearest example',
        },
        {
          quote: 'Judge Frank Easterbrook opened a well-known article, "Discovery as Abuse," by analogizing the process to "nuclear war." Charles Yablon described how one firm made life difficult for opposing counsel: it printed documents on dark red, foul-smelling paper, so their contents would be nearly illegible and the attorneys would get nauseous reviewing them.',
          label: 'Historical characterizations',
        },
        {
          quote: 'As Arthur Miller aptly observed, discovery\'s key defect was believing "that adversarial tigers would behave like accommodating pussycats throughout the discovery period, saving their combative energies for trial."',
          type: 'context',
        },
        {
          quote: 'Similar dynamics can appear in transactional work, where lawyers compete to "outfox" each other on disclosures and contract terms.',
          label: 'Beyond litigation',
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
        'Digitization offers a cautionary tale. Better search capabilities could have reduced discovery costs by making document review more efficient. Instead, litigators exploited the surge in digital documents to drive up costs for opponents, leaving total litigation costs high.',
      ],
      evidenceLabel: 'How did digitization fail to reduce discovery costs? →',
      evidence: [
        {
          quote: 'We draw on David Engstrom\'s scholarship examining the relationship between discovery, technological change, and litigation costs.\nDigitization might have pushed discovery costs in either direction.\nBetter search capabilities meant attorneys could review documents more efficiently, driving down costs while increasing the relevance of information shared.\nYet the explosion of digital information increased what parties might need to search through during discovery, creating more opportunities for discovery abuse.\nDiscovery accounts for roughly "one-third to one-half of all litigation costs" when used.\nFortune 200 companies reported that in cases with over $250,000 in legal fees, average litigation costs nearly doubled from $66 million per company in 2000 to $115 million in 2008.\nFor every page eventually shown at trial, over 1,000 pages were produced in discovery.\nThe main lesson of digitization is that adversarial processes do not translate predicted productivity gains into lower-cost legal outcomes by default.\nAn arms race of legal work in any stage of litigation can erode efficiency gains and make achieving clients\' objectives expensive.',
          isList: true,
        },
      ],
    },
  ],
  reform: {
    id: 'p2-reform',
    category: 'EXAMPLES OF REFORM',
    title: 'With reform',
    subtitle: 'Examples: judges make litigation less adversarial; parties use arbitration as a parallel track',
    explanation: [
      '**Judges reduce adversarial dynamics:** Judges already have some tools, but they\'re underused. Some judges have proposed appointing neutral expert witnesses under Federal Rule of Evidence 706, or using special masters under Federal Rule of Civil Procedure 53 to manage discovery.',
      '**Arbitration as a parallel track:** Voluntary arbitration can promote choice, reduce court backlogs, and create natural experiments comparing human and AI adjudication, though we want to acknowledge fairness critiques. The benefits above assume the decision to enter arbitration reflects the free choice of both parties.',
    ],
    evidenceSections: [
      {
        label: 'What tools already exist? →',
        title: 'Court-Appointed Experts & Special Masters',
        evidence: [
          {
            quote: 'Under Federal Rule of Evidence 706, judges can appoint neutral experts that work for the court but are paid for by both parties. Judge Bradford Charles argues this can solve the "battle of experts" problem where competing specialists "abandon objectivity and become advocates for the side that hired them."',
            label: 'Court-appointed experts',
          },
          {
            quote: 'When technical issues are central to a case, court-appointed experts can provide neutral assessments that frame issues more productively, avoiding an arms race of dueling expert reports.',
            type: 'context',
          },
          {
            quote: 'Judge Shira Scheindlin and Jonathan Redgrave explain that special masters can "assist and, when necessary, direct the parties" to complete discovery efficiently… Rather than having parties fight over AI-assisted document review through successive motions, a special master could serve as an intermediary and prevent the technology from enabling larger discovery battles.',
            label: 'Special masters',
          },
          {
            quote: 'Judges currently have the discretion to intervene under these rules, but Congress could also pass legislation that makes them mandatory.',
            type: 'context',
          },
        ],
      },
      {
        label: 'What are the advantages and concerns? →',
        title: 'Arbitration as a Parallel Track',
        evidence: [
          {
            quote: 'Some critique arbitration as unfair because companies often force it upon consumers and employees through "take-it-or-leave-it" contracts of adhesion. These fairness concerns are important, and others have written about the level of consent needed for arbitration to be truly fair.',
            label: 'Critique: Fairness',
          },
          {
            quote: 'It can promote choice by allowing litigants to decide between traditional judicial review and AI-assisted adjudication. A consumer defending against an automated debt collection suit might prefer quick AI resolution over years of waiting, while a defendant facing serious consequences might insist on traditional review by human judges.',
            label: 'Advantage #1: Promotes choice',
          },
          {
            quote: 'Should an arms race of legal outputs risk overwhelming the courts, the availability of a technology-mediated alternative can alleviate pressure on the courts, preserving human review for the contexts where those navigating the judicial system feel they need it most.',
            label: 'Advantage #2: Reduces court pressure',
          },
          {
            quote: 'It creates a natural experiment that facilitates comparison between human and AI adjudicators on dimensions like speed, cost, and participant satisfaction.',
            label: 'Advantage #3: Creates natural experiments',
          },
        ],
      },
    ],
  },
};

export default pathway2;
