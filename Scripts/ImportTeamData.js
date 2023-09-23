const { ethers } = require('ethers');

// Connect to the Ethereum network (this example uses Ethereum's mainnet)
const provider = new ethers.JsonRpcProvider('https://rpc.gnosis.gateway.fm'); // Replace with your RPC URL e.g. Infura, Alchemy, etc.

// Your Ethereum private key to sign transactions
const privateKey = '';
const wallet = new ethers.Wallet(privateKey, provider);

// Contract ABI and address
const hackBoardRegistryABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AllTeams",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TeamID",
				"type": "uint256"
			}
		],
		"name": "GetTeamInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "discord",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bountyTargets",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "teamToken",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "interest",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "pledge",
						"type": "bool"
					}
				],
				"internalType": "struct HackBoardRegistry.Team",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "HackBoardAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "discord",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bountyTargets",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "interestedInPredictionMarket",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "pledgedToDistributePrize",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "tokenSymbol",
				"type": "string"
			}
		],
		"name": "RegisterTeam",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TeamIncrement",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "team",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "discord",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bountyTargets",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "interestedInPredictionMarket",
				"type": "bool"
			}
		],
		"name": "importOldTeam",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "teamCreated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teamList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "teams",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "discord",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bountyTargets",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "teamToken",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "interest",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "pledge",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "updateDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_discord",
				"type": "string"
			}
		],
		"name": "updateDiscord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_interest",
				"type": "bool"
			}
		],
		"name": "updateInterest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "updateMainBountyTarget",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "updateName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_pledge",
				"type": "bool"
			}
		],
		"name": "updatePledge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const hackBoardRegistryAddress = '0x692A2709F470d5c468B543698bd470d2Ac55c1a1'; // Replace with your deployed contract address

const hackBoardRegistry = new ethers.Contract(hackBoardRegistryAddress, hackBoardRegistryABI, wallet);

// Old Team Data
const oldTeams = [
        [
            "0xc932b3a342658A2d3dF79E4661f29DfF6D7e93Ce",
            "HackBoard",
            "We're HackBoard, an EthGlobalNYC hackathon team trying to augment the inter-team dynamic at the hackathon, for better collaboration, brainstorming and social connection. As you can see, we currently have a basic site set up allowing teams to sign up and express interest in a potential predictions market. Learn more about the diverse teams here in New York to spark your own ideas. Best of luck to everyone!",
            "https://discord.gg/PRHxT96u",
            "Unsure",
            [
                "0xc932b3a342658A2d3dF79E4661f29DfF6D7e93Ce",
                "0x92a0925C3c08C12e6e2185595FF94a49c1dfB5fB"
            ],
            true
        ],
        [
            "0xBbbEc054d75b9f75a96AeD0BB3bfFA310777ac95",
            "Rizz",
            "Decentralized event service with nfts",
            "no discord link",
            "All of them.",
            [
                "0xBbbEc054d75b9f75a96AeD0BB3bfFA310777ac95"
            ],
            true
        ],
        [
            "0x0ef7819DcD6d13950c774D9B3d2a293f637b8f50",
            "Whatlet",
            "The WhatsApp dApp",
            "D9J9V",
            "Biconomy",
            [
                "0x0ef7819DcD6d13950c774D9B3d2a293f637b8f50"
            ],
            true
        ],
        [
            "0x228568EA92aC5Bc281c1E30b1893735c60a139F1",
            "Gremlins",
            "High-level language and compiler for querying blockchain.",
            "ricmoo",
            "Main",
            [
                "0x228568EA92aC5Bc281c1E30b1893735c60a139F1"
            ],
            true
        ],
        [
            "0xeC55Ef79e97a74239100f8DC804D0626EE6bDD7c",
            "StableHR",
            "We r not sure yet!",
            "",
            "anything with 20k",
            [
                "0xeC55Ef79e97a74239100f8DC804D0626EE6bDD7c"
            ],
            true
        ],
        [
            "0x0070cda707CB93870E4F51ce7ACacac58Adb8CB7",
            "GovernUs",
            "A Governance platform to allow web2 communities to self-govern more efficiently by leveraging web3 tools.",
            "marmaj819",
            "Near, polygon",
            [
                "0x0070cda707CB93870E4F51ce7ACacac58Adb8CB7"
            ],
            true
        ],
        [
            "0xF08a80E57E3E86434c6d47Ba133E0a08D0266f6c",
            "Topological Control ",
            "We are building a control module to track the topology of the Ethereum network",
            "eyal_42",
            "Main Prize",
            [
                "0xF08a80E57E3E86434c6d47Ba133E0a08D0266f6c"
            ],
            true
        ],
        [
            "0xBD4604F66C74d16BC74A20013071fAD49359C338",
            "Wisdom",
            "You'll see (or will you ?)",
            "",
            "Not sure",
            [
                "0xBD4604F66C74d16BC74A20013071fAD49359C338"
            ],
            true
        ],
        [
            "0xAA289325d1afc4AA040281b10dD9f10A8560D296",
            "SYLee",
            "We are making awesome DeFi Platform🔥",
            "dann0614",
            "Biconomy",
            [
                "0xAA289325d1afc4AA040281b10dD9f10A8560D296"
            ],
            true
        ],
        [
            "0x118EDd03335D07B498A511213cDb9FDfB448EcA3",
            "Split ",
            "Splitwise clone",
            "niftybruh",
            "Hyperlane Interopability ",
            [
                "0x118EDd03335D07B498A511213cDb9FDfB448EcA3"
            ],
            true
        ],
        [
            "0x118EDd03335D07B498A511213cDb9FDfB448EcA3",
            "Split ",
            "Splitwise clone",
            "niftybruh",
            "Hyperlane Interopability ",
            [
                "0x118EDd03335D07B498A511213cDb9FDfB448EcA3"
            ],
            true
        ],
        [
            "0x827C952A572CB99eF4AF7b9ec837c7438DA174e9",
            "SocialTruth",
            "Users rate their perceived veracity of arbitrary information. This rating is connected with the users' identities. Frontend allows to see aggregated veracity of any information filtered on any identity combination.",
            "1m1_dd",
            "Best Lens App",
            [
                "0x827C952A572CB99eF4AF7b9ec837c7438DA174e9"
            ],
            true
        ],
        [
            "0x5b69409589f98A28D70E96aA4c77086bE6Eb0816",
            "CarbonAccesss",
            "Create an interface to allow web3 and web2 users to purchase carbon credits and retire them so they can claim carbon neutrality and sign their sustainability values.",
            "rubrixks",
            "Celo, ENS, other stuff",
            [
                "0x5b69409589f98A28D70E96aA4c77086bE6Eb0816"
            ],
            true
        ],
        [
            "0xC328d4fCE08284941cec21d27041dCC5ba598529",
            "Ben's Team",
            "Making a fund manager",
            "anishp",
            "Polygon, aave, etc",
            [
                "0xC328d4fCE08284941cec21d27041dCC5ba598529"
            ],
            true
        ],
        [
            "0x84709fE82219B0dd7c3140F343f9827E376841e4",
            "Engage.gg",
            "Engage is a platform for content creators to reward their fanbase",
            "madhukar01",
            "Lens Protocol",
            [
                "0x84709fE82219B0dd7c3140F343f9827E376841e4"
            ],
            true
        ],
        [
            "0xD8e4D855cb8908B3DcC83c993aE02bC62a74F8b9",
            "GreenYield",
            "Don't let your money sleep on a bank account. Own it. Multiply it.",
            "/",
            "Privy, Unlimit, AAVE, Compound",
            [
                "0xD8e4D855cb8908B3DcC83c993aE02bC62a74F8b9"
            ],
            true
        ],
        [
            "0x0a2648aD71b4d80b08323dDa7e8AA412356C072b",
            "Autonomy",
            "Autonomy is an autonomous AI Agent and Data marketplace that allows users to buy, sell, and build composable AI systems.",
            "marissaposner",
            "Alliance DAO",
            [
                "0x0a2648aD71b4d80b08323dDa7e8AA412356C072b"
            ],
            true
        ]
    ];

async function importOldTeams() {
    for (const team of oldTeams) {
        const [teamAddress, name, description, discord, bountyTargets, , interestedInPredictionMarket] = team;
        console.log(teamAddress, name, description, discord, bountyTargets, interestedInPredictionMarket)
        // Call the importOldTeam function
        const tx = await hackBoardRegistry.importOldTeam(teamAddress, name, description, discord, bountyTargets, interestedInPredictionMarket);
        console.log(`Sent transaction with hash: ${tx.hash}`);

        await tx.wait();
        console.log(`Transaction ${tx.hash} confirmed!`);
    }

    console.log("All old teams imported successfully!");
}

// Execute the function
importOldTeams().catch(console.error);
