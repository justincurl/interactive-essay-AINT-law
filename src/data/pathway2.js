export const pathway2 = {
  id: 'pathway2',
  nodes: [
    {
      id: 'p2-node1',
      type: 'starting',
      category: 'STARTING CONDITION',
      title: 'AI adoption in legal contexts',
      subtitle: 'People are effectively using AI for legal work',
      explanation: [
        'This pathway begins with a different starting condition: AI tools are widely used. Lawyers draft faster, review more documents, complete tasks more efficiently. But productivity is not the same as outcomes.',
        'The paper argues that to understand AI\'s impact, we must distinguish inputs, outputs, and outcomes. Clients don\'t want more legal work done; they want their disputes resolved, their deals closed, their rights protected. In adversarial contexts, getting better at producing outputs doesn\'t necessarily make outcomes easier to achieve.',
      ],
      evidenceLabel: 'What\'s the inputs/outputs/outcomes framework?',
      evidence: [
        {
          quote: 'Even in a world where AI increases lawyers\' productivity and completes legal tasks, it might not lower the costs of legal services. To see why, it is crucial to distinguish inputs and outputs from outcomes.',
          source: 'The Paper',
        },
        {
          quote: 'Inputs: Employee talent, billable hours, technological tools. Outputs: Contracts drafted, motions filed, briefs written. Outcomes: Disputes resolved, deals closed, rights protected.',
          source: 'The Paper',
        },
        {
          quote: 'Consumers purchase legal services to achieve specific outcomes. Inputs and outputs can indirectly lead to those outcomes because more hours worked and more legal tasks help clients get the outcomes they want. But in a zero-sum context where the value of legal services is relative, if both sides increase their outputs, the advantages to either side of doing so can be limited.',
          source: 'The Paper',
        },
        {
          quote: 'Instead, AI might simply raise the inputs and outputs required to reach the same outcome, with productivity gains absorbed by greater production.',
          source: 'The Paper',
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
        'Because legal outcomes often depend on relative rather than absolute quality, when both parties become more productive, the competitive equilibrium simply shifts upward. In a world with advanced AI, achieving the same result—like settling favorably or prevailing at trial—would require more legal work, not less.',
        'The billable hours model reinforces this: more hours worked means more revenue for firms, regardless of whether outcomes improve. Similar dynamics appear in transactional work, where lawyers compete to "outfox" each other on disclosures and contract terms.',
      ],
      evidenceLabel: 'How does cost-imposition work as legal strategy?',
      evidence: [
        {
          quote: 'It is a "core premise of litigation economics" that "all things being equal, the party facing higher costs will settle on terms more favorable to the party facing lower costs."',
          source: 'The Paper',
        },
        {
          quote: 'Each side can leverage these features to impose costs on the other. A requesting party, through excessive requests, can compel their adversary to review more documents for confidentiality and relevance. And a reviewing party, through excessive production, can bury relevant information in mountains of extraneous material, forcing the opposing side to spend more time on review.',
          source: 'The Paper',
        },
        {
          quote: 'Judge Frank Easterbrook opened a well-known article, "Discovery as Abuse," by analogizing the process to "nuclear war." Charles Yablon described how one firm made life difficult for opposing counsel: it printed documents on dark red, foul-smelling paper, so their contents would be nearly illegible and the attorneys would get nauseous reviewing them.',
          source: 'The Paper',
        },
        {
          quote: 'As Arthur Miller aptly observed, discovery\'s key defect was believing "that adversarial tigers would behave like accommodating pussycats throughout the discovery period, saving their combative energies for trial."',
          source: 'Arthur Miller',
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
        'Discovery now accounts for one-third to one-half of all litigation costs when used. For every page eventually shown at trial, over 1,000 pages were produced in discovery. AI risks repeating this pattern across all stages of litigation.',
      ],
      evidenceLabel: 'How did digitization fail to reduce discovery costs?',
      evidence: [
        {
          quote: 'Digitization might have pushed discovery costs in either direction. Better search capabilities meant attorneys could review documents more efficiently, driving down costs while increasing the relevance of information shared.',
          source: 'The Paper (optimistic prediction)',
        },
        {
          quote: 'Yet the explosion of digital information increased what parties might need to search through during discovery, creating more opportunities for discovery abuse.',
          source: 'The Paper',
        },
        {
          quote: 'Discovery accounts for roughly "one-third to one-half of all litigation costs" when used. Fortune 200 companies reported that in cases with over $250,000 in legal fees, which are typically the kinds of complex litigation that require discovery, average litigation costs nearly doubled from $66 million per company in 2000 to $115 million in 2008.',
          source: 'David Engstrom\'s scholarship',
        },
        {
          quote: 'The main lesson of digitization, then, is that adversarial processes do not translate predicted productivity gains into lower-cost legal outcomes by default.',
          source: 'The Paper',
        },
      ],
    },
  ],
  reform: {
    id: 'p2-reform',
    category: 'WITH REFORM',
    title: 'Procedural Reform',
    subtitle: 'Examples: judges make litigation less adversarial; parties use arbitration as a parallel track',
    explanation: [
      'Judges already have tools to reduce adversarial dynamics. They can appoint neutral expert witnesses under Federal Rule of Evidence 706, or use special masters under Federal Rule of Civil Procedure 53 to manage discovery. These tools exist but are underused.',
      'Arbitration offers another path: because it grants parties autonomy over the process, it\'s "the \'ideal entry point for broader AI adoption in the legal field.\'" Voluntary arbitration can promote choice, reduce court backlogs, and create natural experiments comparing human and AI adjudication.',
    ],
    evidenceLabel: 'What tools already exist?',
    evidence: [
      {
        quote: 'Under Federal Rule of Evidence 706, judges can appoint neutral experts that work for the court but are paid for by both parties. Judge Bradford Charles argues this can solve the "battle of experts" problem where competing specialists "abandon objectivity and become advocates for the side that hired them."',
        source: 'The Paper (Option 1: Court-Appointed Experts)',
      },
      {
        quote: 'Judge Shira Scheindlin and Jonathan Redgrave explain that special masters can "assist and, when necessary, direct the parties" to complete discovery efficiently... Rather than having parties fight over AI-assisted document review through successive motions, a special master could serve as an intermediary and prevent the technology from enabling larger discovery battles.',
        source: 'The Paper (Option 2: Special Masters)',
      },
      {
        quote: 'First, it can promote choice by allowing litigants to decide between traditional judicial review and AI-assisted adjudication. A consumer defending against an automated debt collection suit might prefer quick AI resolution over years of waiting, while a defendant facing serious consequences might insist on traditional review by human judges.',
        source: 'The Paper (Option 3: Arbitration)',
      },
      {
        quote: 'Third, it creates a natural experiment that facilitates comparison between human and AI adjudicators on dimensions like speed, cost, and participant satisfaction.',
        source: 'The Paper (on arbitration benefits)',
      },
    ],
  },
};

export default pathway2;
