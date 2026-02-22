import React from 'react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    frequency: '/month',
    description: 'Perfect for getting started and trying out Tweme.',
    features: [
      '5 requests per day',
      'Basic GIF matching',
      'Standard support',
      'Community access',
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Basic',
    price: '$10',
    frequency: '/month',
    description: 'The sweet spot for active social media users.',
    features: [
      'Up to 100 requests per day',
      'Priority GIF matching',
      'Email support',
      'Ad-free experience',
      'Custom keywords',
    ],
    cta: 'Go Basic',
    mostPopular: true,
  },
  {
    name: 'Unlimited',
    price: '$20',
    frequency: '/month',
    description: 'For power users and social media managers.',
    features: [
      'Unlimited requests',
      'Advanced AI matching',
      '24/7 Priority support',
      'Early access to features',
      'API access',
      'Bulk generations',
    ],
    cta: 'Go Unlimited',
    mostPopular: false,
  },
]

export default function Pricing() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Pricing</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Choose the right plan for you
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Scale your tweet reactions with our flexible pricing options. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                tier.mostPopular
                  ? 'bg-slate-800 border-blue-500 shadow-blue-500/10 shadow-2xl'
                  : 'bg-slate-800/50 border-slate-700'
              } transition-transform hover:-translate-y-2`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                <span className="text-slate-400 ml-1">{tier.frequency}</span>
              </div>

              <ul className="flex-1 mb-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  tier.mostPopular
                    ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            Questions? <a href="#" className="text-blue-500 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  )
}
