# cryptoCurrencyApp

| HTTP Method 	| URI path      	| Description                                    	| PROTECTED	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/`             	| Index page          	                        |         🆓|
| GET         	| `/contact`             	| Contact page          	                        |         🆓|
| GET         	| `/log-in` 	| Log-in page (render) 	|                                    🆓    |
| POST         	| `/log-in` 	| Log-in page (handler)                                    	|  🆓|
| GET         	| `/sign-up` 	| Sign-up (render) 	                                        |  🆓|
| POST         	| `/sign-up` 	| Sign-up (handler) 	                                        |  🆓|
| GET         	| `/main` 	| Main info page  for users                                     | Users |
| GET         	| `/profile` 	| User profile 	                                       | Users |
| GET         	| `/edit-profile` 	| Edit user profile 	   (render)                                    | Users |
| POST         	| `/edit-profile` 	| Edit user profile 	        (handler)                           | Users |
| GET         	| `/news` 	| Crypto news 	|  BASIC/ INTERMEDIATE/ ADVANCED|
| GET         	| `/tips-to-invest` 	| Tips to invest  	|  INTERMEDIATE/ ADVANCED|
| GET         	| `/market-data` 	| Market data  of cryptocurrency  	|  ADVANCED|
