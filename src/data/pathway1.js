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
      ],
      evidenceLabel: 'Why does this matter now? See the cost data',
      evidence: [
        {
          quote: 'This excitement comes at a time when legal services are expensive. Millions of individuals are priced out of legal assistance, while corporate legal fees keep climbing. The technology is advancing; the question is whether it will actually make legal services more accessible.',
          type: 'context',
        },
        {
          quote: 'In 2024, the median partner at large law firms charged $1,050 per hour, with some commanding over $2,300. Fortune 200 companies reported that their average litigation costs in cases exceeding $250,000 in legal fees nearly doubled over eight years, climbing from $66 million per company in 2000 to $115 million in 2008.',
          label: 'At the top end of the market (BigLaw)',
        },
        {
          quote: 'In an average eight-hour workday, lawyers engaged in billable work for only 2.3 hours, billed 1.9 hours, and collected payment for just 1.6 hours. So although clients paid an average of $260 per hour, lawyers effectively received $25-40 per hour because the rest of their time was spent finding clients, managing administrative tasks, and collecting payments.',
          label: 'At the bottom end of the market (PeopleLaw)',
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
      subtitle: 'UPL regulations: Only licensed attorneys can practice law\nEntity regulations: Only lawyers can own equity in businesses offering legal services',
      explanation: [
        'Unauthorized-practice-of-law (UPL) regulations prohibit non-lawyers from performing legal work. Individuals and organizations can face steep fines and criminal liability if courts conclude their AI systems cross into practicing law, forcing providers to either limit their tools\' functionality or risk enforcement.',
        'Most states also limit who may share in legal fees or own equity in law firms. Together, these rules create legal uncertainty for AI tools and block business models that might deliver legal services at lower cost. The New York Bar Association has warned that "AI-powered chat bots now hover on the line of unauthorized practice of law."',
      ],
      evidenceLabel: 'How do these rules create inefficiency?',
      evidence: [
        {
          quote: 'UPL laws make it illegal (in some jurisdictions a felony) for unlicensed attorneys to apply legal knowledge to specific circumstances. An unfortunate effect is to make it more expensive to offer basic legal assistance in contexts requiring little legal expertise.',
          label: 'Unauthorized Practice of Law (UPL)',
        },
        {
          quote: 'These regulations require lawyers to serve clients through partnerships fully owned and financed by lawyers. They deter alternative models that involve large-scale businesses with centralized billing, customer service, marketing, and administrative functions, which could leverage economies of scale to deliver legal services at $30-50 per hour instead of $260.',
          label: 'Entity ownership restrictions',
        },
        {
          quote: 'Importantly, none of the sources of market dysfunction are intrinsic to legal services. They reflect choices about procedure, pricing, and professional governance.',
          type: 'context',
        },
      ],
    },
    {
      id: 'p1-node3',
      type: 'impact',
      category: 'IMPACT WITHOUT REFORM',
      title: 'Limits on AI use by consumers',
      subtitle: 'Threat of liability chills experimentation. Capabilities aren\'t helpful without access',
      explanation: [
        'The threat of UPL liability inhibits AI adoption even where it would clearly help. Organizations risk fines and criminal liability if their AI systems provide legal advice, so they may be unwilling to provide access to users—especially those who cannot afford to compensate developers for the risk.',
        'LegalZoom, which automates routine tasks like preparing documents for trademark filings, has been plagued by UPL lawsuits for years. The nonprofit Upsolve tried to help New Yorkers respond to debt collection suits with volunteer assistance and ended up in federal court. As the paper states: "Without reforms, if consumers cannot access AI capabilities, they won\'t be able to accomplish their legal goals, regardless of how advanced the technology becomes."',
      ],
      evidenceLabel: 'See how this played out with Upsolve and the debt collection crisis',
      evidence: [
        {
          quote: 'From 1993 to 2013, debt collection lawsuits grew from 1.7 million to about 4 million. In Michigan, these lawsuits made up 37% of all civil district court case filings by 2019. More than 70% of debt collection defendants lose by default for failing to respond, even though many are "meritless suits" and responding is not complicated.',
          label: 'The debt collection crisis',
        },
        {
          quote: 'The nonprofit Upsolve trained volunteers to help New Yorkers respond to these suits. Concerned that this might violate New York\'s UPL rules, Upsolve sought an injunction declaring this basic assistance was protected by the First Amendment. A federal judge agreed. But New York appealed to the Second Circuit, which concluded the lower court applied the wrong First Amendment test and invalidated the injunction.',
          label: 'The Upsolve case',
        },
        {
          quote: 'It\'s easy to see how an AI system could help here. Despite this potential, organizations risk violating UPL laws whenever their AI tools complete "tasks that require legal judgment or expertise."',
          type: 'context',
        },
      ],
    },
  ],
  reform: {
    id: 'p1-reform',
    category: 'WITH REFORM',
    title: 'Regulatory Reform',
    subtitle: 'Examples: state courts update regulations; creation of regulatory markets',
    explanation: [
      'Several reforms could address regulatory barriers. Creating new tiers of legal service providers is "one of the \'fastest growing UPL reform program types\' nationally, with seven states adopting this approach and another 10 considering it." Arizona and Utah have created regulatory sandboxes allowing experimentation with alternative business structures.',
      'More ambitiously, some scholars propose "superregulator" models that would create markets for legal regulation itself, letting outcomes drive innovation rather than top-down rules.',
    ],
    evidenceLabel: 'What are Arizona and Utah learning?',
    evidence: [
      {
        quote: 'Utah and Arizona recently created regulatory sandboxes. Utah\'s sandbox allows entities to seek waivers from ownership restrictions and UPL rules, while Arizona eliminated restrictions on law firm ownership and fee-sharing. These sandboxes permit companies and nonprofits to operate under modified professional rules while regulators assess their impact on service quality, cost, and access to justice.',
        label: 'The sandbox model',
      },
      {
        quote: 'These sandboxes treat regulatory experimentation as necessary for balancing protection and innovation for consumers. Overly stringent restrictions can backfire by protecting inefficient incumbents or forcing new entrants outside the law.',
        type: 'context',
      },
      {
        quote: 'Early evidence on the impact of these reforms has been largely positive, though concerns have emerged regarding private equity ownership and mass tort litigation financing. Despite scant evidence of consumer harm—Utah\'s Innovation Office only received 20 total complaints—lawyers and commerce groups petitioned the Arizona and Utah supreme courts to limit these sandboxes. The Arizona Supreme Court stayed the course, and authorized entities grew from 19 to 136 between 2022 and 2025. The Utah Supreme Court has since raised eligibility requirements, and authorized entities shrank from 39 to 11 over the same period.',
        label: 'Early results',
      },
    ],
  },
};

export default pathway1;
