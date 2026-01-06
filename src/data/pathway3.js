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
        'This pathway begins with a bolder starting condition: AI productivity gains outpace increases in legal work volume. Perhaps AI becomes so advanced that the costs of completing all legal tasks fall nearly to zero, or there\'s an upper limit on arms races for certain kinds of legal work.',
      ],
      evidenceLabel: 'When would this scenario arise? →',
      evidence: [
        {
          quote: 'This is most relevant when AI gains outpace increases in production, which could happen for a number of reasons. Perhaps there\'s an upper limit on arms races for certain kinds of legal work. After all, some legal doctrines are only so complicated, and courts often impose strict page limits on filings. Or maybe AI is so advanced that the costs of all legal tasks falls basically to zero and increased production does not absorb productivity gains.',
          type: 'context',
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
        'Bottleneck 1: Judges in litigation If AI enables a flood of legal work, judges will likely respond by taking longer to resolve disputes (delaying outcomes) or delegating more to assistants (lowering adjudication quality). There is a limit to how much AI can accelerate the judicial process without meaningfully sacrificing human involvement.',
        'Bottleneck 2: Clients understanding contracts Even if AI drafts entire contracts, human lawyers (or their clients) still need time to understand what those provisions mean for an organization\'s interests. The speed of human decision-makers places an upper limit on how much AI can accelerate legal processes.',
      ],
      evidenceSections: [
        {
          label: 'Could AI judges solve this? →',
          title: 'Could AI Judges Solve This?',
          evidence: [
            {
              quote: 'Some authors are open to replacing human judges entirely with AI (Eugene Volokh; Estonia\'s "robot judge" experiment). One early report suggests that AI is helping Brazil\'s courts resolve cases more quickly.',
              label: 'Some have recommended AI judges',
            },
            {
              quote: 'We find the legal (Article III likely requires human judges—Florida Bar), technical (hallucination and private influence problems—Kapoor), and moral objections (eucrim) persuasive. Even avowedly pro-AI lawyer Adam Unikowsky acknowledges he is "not quite ready to be ruled by robots."',
              label: 'The objections',
            },
            {
              quote: 'This is not to say that there is no role for AI in judging. But judges should adopt AI through careful, deliberate choices instead of in ways compelled by the need to keep up with an arms race of AI-powered legal work.',
              label: 'The appropriate role for AI',
            },
            {
              quote: 'All this to say, we believe some measure of human involvement in the legal system is valuable and necessary, though this is a normative position and not an empirical claim.',
              label: 'Our normative position',
            },
          ],
        },
        {
          label: 'What about contracts people don\'t read anyway? →',
          title: 'Contracts and Human Understanding',
          evidence: [
            {
              quote: 'Arguably, human involvement matters less for contracts because many Americans already agree to contracts (like privacy policies) without reading them.',
              label: 'The counterargument',
            },
            {
              quote: 'But we think this reflects the belief that they have insufficient bargaining power to negotiate new terms, or that it\'s not worthwhile to do so, rather than a general endorsement of signing contracts they don\'t understand.',
              label: 'Our response',
            },
            {
              quote: 'If advanced AI reduces the cost of drafting contracts (perhaps it can instantly draft 50 perfect provisions), a contracting party, even with the help of AI, will still need time to understand what those provisions do and how they impact the party\'s future interests.',
              label: 'Why contract understanding matters',
            },
          ],
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
        'Debt collection courts offer a preview of what happens when human judges can\'t keep pace. As technology enabled collectors to cheaply file lawsuits, state courts became overwhelmed. Some now operate "judgeless courtrooms" with lax evidentiary standards; more than 70% of debt collection defendants lose by default. If AI floods courts further, judges face impossible choices.',
      ],
      evidenceLabel: 'What do overwhelmed courts actually do? →',
      evidence: [
        {
          quote: 'We draw on Leo You Li\'s scholarship examining how courts have managed a flood of debt collection cases.',
          type: 'context',
        },
        {
          quote: 'As technology has enabled collectors to buy outstanding debt and cheaply file lawsuits for enforcement, the explosion of debt collection lawsuits has overwhelmed state courts.',
          label: 'What\'s happening now',
        },
        {
          quote: 'Some have resorted to delegating cases to court assistants. Others operate "judgeless courtrooms" with lax evidentiary standards that can lower the quality of adjudication and can undermine the rationale for the judicial process itself.',
          label: 'The responses',
        },
        {
          quote: 'If judges do not delegate, adjudicating cases will take longer as both the number of cases and the work each requires expands. Yet as the common legal maxim says: "Justice delayed is justice denied." Although more people might gain access to court, if judges require years to adjudicate cases, plaintiffs will face a choice between protracted litigation with no guarantee of success and settling cases on increasingly unfavorable terms as resolution times lengthen.',
          label: 'The delay problem',
        },
        {
          quote: 'AI might help make judges more efficient—one early report suggests AI is helping Brazil\'s courts resolve cases more quickly. But if AI advances continuously reduce filing costs and drive up legal outputs, it will grow increasingly difficult for judges, even with the help of AI, to keep pace while staying meaningfully involved.',
          label: 'What this means for AI',
        },
      ],
    },
  ],
  reform: {
    id: 'p3-reform',
    category: 'WITH REFORM',
    title: 'With reform',
    subtitle: 'Examples: legislatures fund more judges; legal training better equips attorneys to move up the value chain',
    explanation: [
      'Example 1: Congress and the states could expand the judiciary The most straightforward response to an overburdened judiciary is to hire more judges—a solution legal scholars have advocated for decades. While politically complicated, it\'s not as unrealistic as some fear, especially given the magnitude of AI\'s potential disruption.',
      'Example 2: Lawyers could shift focus from legal tasks to understanding an organization\'s needs As AI handles routine tasks, value moves from completing tasks to exercising judgment and deeply understanding organizations\' needs. In-house lawyers will likely spend more time on strategic advising and less on document production. Legal education will need to evolve accordingly.',
    ],
    evidenceSections: [
      {
        label: 'How realistic is this? →',
        title: 'Expanding the Judiciary',
        evidence: [
          {
            quote: 'Writing in 1979, Maria Marcus argued that "since the factors that channel disputes into a judicial forum continue unabated, the appointment of more judges is an obvious response." Bert Huang again recommended in 2011 that "new demands put on the courts should be met quickly and flexibly with new judicial resources."',
            label: 'The case for more judges',
          },
          {
            quote: 'Menell and Vacca acknowledge that "increasing the number of federal judgeships has been fraught with political complications." Their solution is a bipartisan "2030 Commission" to depoliticize the process.',
            label: 'The political challenge',
          },
          {
            quote: 'Yonathan Arbel views adding judges as "the most direct way of solving the problem" of an AI-driven increase in litigation work, yet notes that redirecting all civil legal aid funding toward the federal court system would yield at most a 30 percent increase in judicial capacity.',
            type: 'context',
          },
          {
            quote: 'Several states have proposed taxing legal services generally. Federal legislation introduced by Senator Thomas Tillis would tax third-party litigation financiers. Deborah Rhode has proposed mandatory pro bono service requirements with the option to "buy out" the obligation—payments that could support judicial expansion.',
            label: 'Possible funding sources',
          },
        ],
      },
      {
        label: 'What could lawyers do instead? →',
        title: 'The Shifting Role of Lawyers',
        evidence: [
          {
            quote: 'At the bottom is basic "low-skilled" legal work like drafting standard letters or simple contracts, repetitive tasks requiring minimal legal expertise. Above that is medium-skill, non-commoditized legal work that involves producing documents, such as analyzing contracts and drafting motions. Higher still is "judgment-based legal work:" overseeing complex trials and addressing legal risks. At the top is strategic advising, where lawyers deeply understand an organization\'s priorities and shape its decisions. This highest level might not involve what we traditionally consider legal work at all.',
            label: 'A hierarchy of legal work',
          },
          {
            quote: 'In a 2023 survey of nearly 300 chief legal officers, 87% said their role is shifting from legal risk mitigator to strategic business partner… As one attorney respondent put it: "The role of a good lawyer is as a \'trusted advisor,\' not as a producer of documents… breadth of experience is where a lawyer\'s true value lies and that will remain valuable."',
            label: 'Industry perspective',
          },
          {
            quote: 'One bar association warned that the "greater concern is that generative AI will displace younger attorneys," who will "have fewer opportunities to gain valuable experience by spending hours on important tasks." As the skills required to succeed changes, so too should the training process.',
            label: 'The training problem',
          },
        ],
      },
    ],
  },
};

export default pathway3;
