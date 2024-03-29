/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// module.exports = {
//   mySidebar: [
//     {
//       type: 'autogenerated',
//       dirName: '.', // generate sidebar slice from the docs folder (or versioned_docs/<version>)
//     },
//   ],
// };


module.exports = {
  mySidebar: [
    'intro',
    'software-stack',
    'network-incentive',
    {
      'Tech': [
        {
          'Scalability': [
            'Tech/Scalability/scaling-blockchain',
            'Tech/Scalability/combination-etc',
            'Tech/Scalability/multiview',
            'Tech/Scalability/slashing',
            'Tech/Scalability/staking-flow',
            'Tech/Scalability/performance',
          ]
        },
        {
          'Privacy': [
            'Tech/Privacy/academic-paper',
            'Tech/Privacy/intro-privacy-v2',
            'Tech/Privacy/fullnode-cache',
            'Tech/Privacy/conversion-tx',
            'Tech/Privacy/pdex-with-privacy2',
          ],
        },
        {
          'Interoperability': [
            'Tech/Interoperability/btc-bridge',
            'Tech/Interoperability/eth-bridge',
            'Tech/Interoperability/pethereum',
            'Tech/Interoperability/bsc-bridge',
            'Tech/Interoperability/prv-bridge',
          ],
        },
      ],
      'Developers': [
        {
          'SDK': [
            'Developers/SDK/go-sdk-v2',
          ],
          'API': [
            {
              'Partners': [
                {
                  'CoinGecko': [
                      'Developers/API/Partners/CoinGecko/spot-dex-exchange'
                  ]
                }
              ]
            }
          ],
          'Tutorials': [
            'Developers/Tutorials/tutorial-puniswap'
          ]
        },
      ],
    },
  ],
};
