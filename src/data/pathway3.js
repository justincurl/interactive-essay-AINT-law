export const pathway3 = {
  id: 'pathway3',
  nodes: [
    {
      id: 'p3-node1',
      type: 'starting',
      category: 'STATE OF THE WORLD',
      title: 'AI gains outpace increases in the volume of legal work',
      subtitle: 'Cost per task decreases at faster rate than outputs increase',
      explanation: [
        'This pathway begins with yet another starting condition: AI gains outpace increases in legal work volume. Perhaps page limits on filings create natural caps on arms races, or AI becomes so advanced that all legal task costs fall nearly to zero.',
        'Even in this optimistic scenario, a final bottleneck emerges: our desire for human beings to adjudicate cases and understand the contracts they sign. Human decision-makers become the scarce resource.',
      ],
      evidenceLabel: 'When would this scenario arise?',
      evidence: [
        {
          quote: 'This is most relevant when AI gains outpace increases in production, which could happen for a number of reasons. Perhaps there\'s an upper limit on arms races for certain kinds of legal work. After all, some legal doctrines are only so complicated, and courts often impose strict page limits on filings. Or maybe AI is so advanced that the costs of all legal tasks falls basically to zero and increased production does not absorb productivity gains.',
          type: 'context',
        },
        {
          quote: 'Starting with litigation, by reducing the cost of filing an initial lawsuit, AI will likely result in more disputes ending up in court. Within each dispute, AI can then create the kind of arms race of outputs described above. As a very rough but conservative estimate, Yonathan Arbel predicts a two to five-fold increase in the volume of litigation.',
          label: 'Predicted increase in litigation',
        },
        {
          quote: 'Arbel outlines several ways that judges might respond to a flood of litigation. They could limit the flow of litigation by altering procedural and substantive doctrines to make it harder for litigants to get into court. Or they could try to limit the use of AI in the courtroom, perhaps by requiring lawyers to disclose AI use or banning AI entirely and sanctioning any violators. Both responses would counteract a flood of litigation work but come at the steep cost of sacrificing access to justice for poorer litigants.',
          label: 'Possible judicial responses',
        },
      ],
    },
    {
      id: 'p3-node2',
      type: 'bottleneck',
      category: 'BOTTLENECK',
      title: 'Human involvement',
      subtitle: 'Desire for human beings to adjudicate cases or understand contracts they sign',
      explanation: [
        'If AI floods courts with cases, judges face a dilemma. They can take longer to resolve each case ("justice delayed is justice denied"), or delegate more to assistants (lowering adjudication quality). Similarly, even if AI drafts entire contracts, humans still need time to understand what those provisions mean.',
        'The authors consider proposals to replace human judges with AI but find the legal, technical, and moral objections persuasive. Even pro-AI lawyer Adam Unikowsky acknowledges he\'s "not quite ready to be ruled by robots."',
      ],
      evidenceLabel: 'Why must humans stay involved?',
      evidence: [
        {
          quote: 'Some authors are open to replacing human judges entirely with AI. We find the legal (Article III, which establishes the federal courts, likely requires human judges), technical (hallucination and private influence problems), and moral objections persuasive.',
          label: 'Objections to AI judges',
        },
        {
          quote: 'This is not to say that there is no role for AI in judging. But judges should adopt AI through careful, deliberate choices instead of in ways compelled by the need to keep up with an arms race of AI-powered legal work.',
          type: 'context',
        },
        {
          quote: 'This bottleneck would not apply if people were to forgo oversight. Arguably, human involvement matters less for contracts because many Americans already agree to contracts (like privacy policies) without reading them. But we think this reflects the belief that they have insufficient bargaining power to negotiate new terms, or that it\'s not worthwhile to do so, rather than a general endorsement of signing contracts they don\'t understand.',
          label: 'The contract context',
        },
        {
          quote: 'All this to say, we believe some measure of human involvement in the legal system is valuable and necessary, though this is a normative position and not an empirical claim.',
          type: 'context',
        },
      ],
    },
    {
      id: 'p3-node3',
      type: 'impact',
      category: 'IMPACT WITHOUT REFORM',
      title: 'AI gains limited by human speed',
      subtitle: 'Judges and contracting parties need time to adjudicate cases & understand contracts',
      explanation: [
        'We already know what overwhelmed courts look like. As technology has enabled debt collectors to cheaply file lawsuits, state courts have been overwhelmed. Some operate "judgeless courtrooms" with lax evidentiary standards. More than 70% of debt collection defendants lose by default.',
        'If AI floods courts further, judges face impossible choices: take years to resolve cases (forcing unfavorable settlements), or sacrifice the quality and legitimacy that make judicial process meaningful.',
      ],
      evidenceLabel: 'What do overwhelmed courts actually do?',
      evidence: [
        {
          quote: 'Returning to the debt collection context, Leo You Li paints an uninspiring picture of how courts have managed a flood of cases. As technology has enabled collectors to buy outstanding debt and cheaply file lawsuits for enforcement, the explosion of debt collection lawsuits has overwhelmed state courts.',
          type: 'context',
        },
        {
          quote: 'Some have resorted to delegating cases to court assistants. Others operate "judgeless courtrooms" with lax evidentiary standards that can lower the quality of adjudication and can undermine the rationale for the judicial process itself.',
          label: 'Current court responses',
        },
        {
          quote: 'If judges do not delegate, adjudicating cases will take longer as both the number of cases and the work each requires expands. Yet as the common legal maxim says: "Justice delayed is justice denied." Although more people might gain access to court, if judges require years to adjudicate cases, plaintiffs will face a choice between protracted litigation with no guarantee of success and settling cases on increasingly unfavorable terms as resolution times lengthen.',
          label: 'The delay problem',
        },
        {
          quote: 'One early report suggests that AI is helping Brazil\'s courts resolve cases more quickly. Yet if AI advances continuously reduce filing costs and drive up legal outputs, it will grow increasingly difficult for judges to keep pace.',
          type: 'context',
        },
      ],
    },
  ],
  reform: {
    id: 'p3-reform',
    category: 'WITH REFORM',
    title: 'Institutional Reform',
    subtitle: 'Examples: legislatures fund more judges; legal training better equips attorneys to move up the value chain',
    explanation: [
      'The most straightforward response to an overburdened judiciary is to hire more judges—a solution legal scholars have advocated for decades. While politically complicated, it\'s not as unrealistic as some fear, especially given the magnitude of AI\'s potential disruption.',
      'Meanwhile, the role of lawyers will shift. As AI handles routine tasks, value moves from completing tasks to exercising judgment and deeply understanding organizations\' needs. Legal education will need to evolve accordingly—particularly since AI may displace the entry-level work through which junior lawyers currently develop expertise.',
    ],
    evidenceLabel: 'What would this transformation look like?',
    evidence: [
      {
        quote: 'Writing in 1979, Maria Marcus argued that "since the factors that channel disputes into a judicial forum continue unabated, the appointment of more judges is an obvious response." Bert Huang again recommended in 2011 that "new demands put on the courts should be met quickly and flexibly with new judicial resources."',
        label: 'The case for more judges',
      },
      {
        quote: 'At the bottom is basic "low-skilled" legal work like drafting standard letters or simple contracts, repetitive tasks requiring minimal legal expertise. Above that is medium-skill, non-commoditized legal work that involves producing documents, such as analyzing contracts and drafting motions. Higher still is "judgment-based legal work:" overseeing complex trials and addressing legal risks. At the top is strategic advising, where lawyers deeply understand an organization\'s priorities and shape its decisions. This highest level might not involve what we traditionally consider legal work at all.',
        label: 'The hierarchy of legal work',
      },
      {
        quote: 'One bar association warned that the "greater concern is that generative AI will displace younger attorneys," who will "have fewer opportunities to gain valuable experience by spending hours on important tasks." As the skills required to succeed changes, so too should the training process.',
        label: 'The training problem',
      },
      {
        quote: 'In a 2023 survey of nearly 300 chief legal officers, 87% said their role is shifting from legal risk mitigator to strategic business partner. As one attorney respondent put it: "The role of a good lawyer is as a \'trusted advisor,\' not as a producer of documents... breadth of experience is where a lawyer\'s true value lies and that will remain valuable."',
        type: 'context',
      },
    ],
  },
};

export default pathway3;
