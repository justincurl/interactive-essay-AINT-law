export const pathway1 = {
  id: 'pathway1',
  nodes: [
    {
      id: 'p1-node1',
      type: 'starting',
      category: 'STATE OF THE WORLD',
      title: 'Advanced AI capabilities',
      subtitle: 'AI can increase lawyers\' productivity and do legal work well',
      explanation: [
        'Many AI leaders believe AI will transform knowledge work. OpenAI\'s CEO predicts AI systems "smarter than humans by 2030," while Anthropic\'s CEO analogizes future AI to "a country of geniuses in a data center." Researchers identify legal services as especially vulnerable to disruption. Since GPT-4 passed the bar exam, much of the profession seems to agree—law schools are incorporating AI into curricula, and some argue AI can already replace law clerks.',
        'This excitement comes at a time when legal services are expensive. Millions of individuals are priced out of legal assistance, while corporate legal fees keep climbing. The technology is advancing; the question is whether it will actually make legal services more accessible.',
      ],
      evidenceLabel: 'Why does this matter now? See the cost data →',
      evidence: [
        {
          quote: 'The legal market is bifurcated, with dysfunction at both ends.',
          type: 'context',
        },
        {
          quote: 'In 2024, the median partner at large law firms charged $1,050 per hour, with some commanding over $2,300. Fortune 200 companies reported that their average litigation costs in cases exceeding $250,000 in legal fees nearly doubled over eight years, climbing from $66 million per company in 2000 to $115 million in 2008.',
          label: 'At the high end',
        },
        {
          quote: 'In an average eight-hour workday, lawyers engaged in billable work for only 2.3 hours, billed 1.9 hours, and collected payment for just 1.6 hours. So although clients paid an average of $260 per hour, lawyers effectively received $25-40 per hour because the rest of their time was spent finding clients, managing administrative tasks, and collecting payments.',
          label: 'At the low end',
        },
        {
          quote: 'The paper\'s central argument is that optimism about AI reducing these costs may be misplaced—not because the technology won\'t work, but because of bottlenecks between capability advances and positive transformation.',
          type: 'context',
        },
      ],
    },
    {
      id: 'p1-node2',
      type: 'bottleneck',
      category: 'BOTTLENECK',
      title: 'Regulatory barriers',
      subtitle: 'Licensing rules restrict both legal practice and law firm investment',
      explanation: [
        'UPL regulations: Unauthorized-practice-of-law (UPL) rules prohibit non-lawyers from performing legal work. AI tools\' status under these laws is unclear, which chills innovation even where AI could clearly help.',
        'Entity regulations: Most states also prohibit non-lawyers from sharing fees or owning equity in law firms. These rules force lawyers to serve clients through small partnerships rather than larger organizations that could achieve economies of scale.',
      ],
      evidenceSections: [
        {
          label: 'How does this create inefficiency? (UPL) →',
          title: 'UPL Regulations & Legal Uncertainty',
          evidence: [
            {
              quote: 'UPL laws make it illegal (in some jurisdictions a felony) for unlicensed attorneys to apply legal knowledge to specific circumstances. An unfortunate effect is to make it more expensive to offer basic legal assistance in contexts requiring little legal expertise.',
              label: 'The basic problem',
            },
            {
              quote: 'Current UPL laws define practice of law imprecisely and may prohibit companies from offering AI-powered legal assistance to consumers.',
              label: 'Vague and varying rules',
            },
            {
              quote: 'The problem with existing UPL rules is not that they are regulations and therefore stifle innovation. It is that their uncertainty and variation discourage competition from new entrants, including the kind that produces better legal services.',
              label: 'The real issue',
            },
            {
              quote: 'The New York Bar Association has warned that "AI-powered chat bots now hover on the line of unauthorized practice of law."',
              label: 'The warning',
            },
          ],
        },
        {
          label: 'How does this create inefficiency? (Entity) →',
          title: 'Entity Regulations & the Inefficient Business Model',
          evidence: [
            {
              quote: 'These regulations require lawyers to serve clients through partnerships fully owned and financed by lawyers. They deter alternative models that involve large-scale businesses with centralized billing, customer service, marketing, and administrative functions, which could leverage economies of scale to deliver legal services at $30-50 per hour instead of $260.',
              label: 'The structural constraint',
            },
            {
              quote: 'In an average eight-hour workday, lawyers engaged in billable work for only 2.3 hours, billed 1.9 hours, and collected payment for just 1.6 hours. So although clients paid an average of $260 per hour, lawyers effectively received $25-40 per hour because the rest of their time was spent finding clients, managing administrative tasks, and collecting payments.',
              label: 'Where the time goes (2017 Clio study)',
            },
            {
              quote: 'Importantly, none of the sources of market dysfunction are intrinsic to legal services. They reflect choices about procedure, pricing, and professional governance.',
              label: 'The key insight',
            },
          ],
        },
      ],
    },
    {
      id: 'p1-node3',
      type: 'impact',
      category: 'IMPACT WITHOUT REFORM',
      title: 'Limits on AI use by consumers (and to some extent lawyers)',
      subtitle: 'Liability threats chill experimentation. Capabilities aren\'t helpful without access',
      explanation: [
        'The threat of UPL liability inhibits AI adoption even where it would clearly help. Organizations risk fines and criminal liability if their AI systems provide legal advice, so they may be unwilling to provide access to users—especially those who cannot afford to compensate developers for the risk.',
        'Without reforms, if consumers cannot access AI capabilities, they won\'t be able to accomplish their legal goals, regardless of how advanced the technology becomes.',
      ],
      evidenceSections: [
        {
          label: 'See how this affects debt collection defendants →',
          title: 'Debt Collection & Upsolve',
          evidence: [
            {
              quote: 'From 1993 to 2013, debt collection lawsuits grew from 1.7 million to about 4 million—in Michigan, they made up 37% of all civil district court filings by 2019. More than 70% of defendants lose by default for failing to respond, even though many are "meritless suits" and responding is not complicated. New York created a response form, but it includes questions "difficult for nonlawyers to understand, such as whether someone would like to invoke the doctrine of \'laches.\'" It\'s easy to see how an AI system could help here.',
              label: 'The debt collection crisis',
            },
            {
              quote: 'The nonprofit Upsolve began training volunteers to help New Yorkers complete these forms. Concerned this might violate UPL rules, Upsolve sought an injunction declaring this basic assistance was protected by the First Amendment. A federal judge agreed—but New York appealed to the Second Circuit, which "concluded the lower court applied the wrong First Amendment test and invalidated the injunction." Despite AI\'s potential to help, "organizations risk violating UPL laws whenever their AI tools complete \'tasks that require legal judgment or expertise.\'"',
              label: 'Upsolve\'s attempt and reversal',
            },
          ],
        },
        {
          label: 'Learn more about decades of UPL lawsuits against LegalZoom →',
          title: 'LegalZoom\'s History of Lawsuits',
          evidence: [
            {
              quote: 'LegalZoom\'s history of lawsuits illustrates how UPL regulations can deter innovation in the delivery of legal services. LegalZoom automates rote tasks like preparing documents for trademark filings and has been plagued by UPL lawsuits for years.',
              label: 'The pattern',
            },
            {
              quote: 'Missouri (2011): Private individuals sued, alleging LegalZoom engaged in UPL because it claimed to "take[] over once a consumer answer[ed] a few simple online questions." After the court denied its motion to dismiss, LegalZoom agreed to compensate plaintiffs and modify its business model.',
              label: 'Missouri (2011)',
            },
            {
              quote: 'North Carolina (2015): The State Bar won a consent judgment requiring LegalZoom to conform to certain conditions.',
              label: 'North Carolina (2015)',
            },
            {
              quote: 'California (2017): Trademark lawyers advanced similar theories against its trademark-filing product.',
              label: 'California (2017)',
            },
            {
              quote: 'New Jersey (2024): A plaintiff brought a class action alleging UPL violations.',
              label: 'New Jersey (2024)',
            },
          ],
        },
      ],
    },
  ],
  reform: {
    id: 'p1-reform',
    category: 'WITH REFORM',
    title: 'With reform',
    subtitle: 'Examples: state courts update regulations; creation of regulatory markets',
    explanation: [
      '**State courts update regulations:** Several states are experimenting with regulatory reform. Creating new tiers of legal service providers is "one of the \'fastest growing UPL reform program types\' nationally, with seven states adopting this approach and another 10 considering it." Arizona and Utah have created regulatory sandboxes allowing experimentation with alternative business structures.',
      '**Create regulatory markets:** More ambitiously, legal scholar Gillian Hadfield proposes a "superregulator" model that would create a market for the regulation of legal services. Rather than directly regulating providers, the government would license competing regulators, shifting its role to setting outcome targets and then licensing regulators that achieve them.',
    ],
    evidenceSections: [
      {
        label: 'What are Arizona and Utah learning? →',
        title: 'Arizona & Utah Regulatory Sandboxes',
        evidence: [
          {
            quote: 'Utah and Arizona recently created regulatory sandboxes… Utah\'s sandbox allows entities to seek waivers from ownership restrictions and UPL rules, while Arizona eliminated restrictions on law firm ownership and fee-sharing. These sandboxes permit companies and nonprofits to operate under modified professional rules while regulators assess their impact on service quality, cost, and access to justice.',
            label: 'The approach',
          },
          {
            quote: 'These sandboxes treat regulatory experimentation as necessary for balancing protection and innovation for consumers. Overly stringent restrictions can backfire by protecting inefficient incumbents or forcing new entrants outside the law.',
            label: 'The rationale',
          },
          {
            quote: 'Early evidence on the impact of these reforms has been largely positive, though concerns have emerged regarding private equity ownership and mass tort litigation financing. Despite scant evidence of consumer harm—Utah\'s Innovation Office only received 20 total complaints—lawyers and commerce groups petitioned the Arizona and Utah supreme courts to limit these sandboxes. The Arizona Supreme Court stayed the course, and authorized entities grew from 19 to 136 between 2022 and 2025. The Utah Supreme Court has since raised eligibility requirements, and authorized entities shrank from 39 to 11 over the same period.',
            label: 'The results',
          },
        ],
      },
      {
        label: 'How would this work? →',
        title: 'The Superregulator Model',
        evidence: [
          {
            quote: 'Gillian Hadfield proposes a "superregulator" model that would create a market for the regulation of legal services. Rather than directly regulating providers, the government would license regulators that would each offer competing regulatory schemes. The government\'s role shifts to "regulating the regulators" by setting outcome targets, such as acceptable levels of legal access or dispute resolution quality, and then licensing regulators that achieve them.',
            label: 'The concept',
          },
          {
            quote: 'Hadfield argues this generates powerful incentives for innovation. A private regulator that develops simpler, more cost-effective compliance methods while meeting government standards will attract more customers. The model also can simplify enforcement: governments can monitor ten licensed regulators more easily than thousands of individual providers.',
            label: 'Why it could work',
          },
          {
            quote: 'Under the UK\'s Legal Services Act 2007, Parliament created the Legal Services Board (LSB), an independent agency that approves private bodies applying to regulate legal services. Competition is emerging for "alternative business structures," which can choose between licensing from the Solicitors Regulation Authority (SRA) or the Bar Standards Board (BSB).',
            label: 'A real-world example',
          },
          {
            quote: 'This U.K. model has, however, encountered difficulties. In 2024-2025, the LSB criticized the SRA for failing to act adequately before a major law firm collapsed, highlighting how superregulators can struggle to enforce quality standards for the regulators they oversee. Some scholars have also criticized regulatory markets for creating a race to the bottom.',
            label: 'The challenges',
          },
        ],
      },
    ],
  },
};

export default pathway1;
