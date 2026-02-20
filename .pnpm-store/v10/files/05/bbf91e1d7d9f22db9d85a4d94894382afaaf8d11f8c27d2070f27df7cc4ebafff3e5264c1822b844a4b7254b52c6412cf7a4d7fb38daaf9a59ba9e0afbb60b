//#region src/graphql/generated/tada-env.d.ts
/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
declare const introspection: {
  readonly __schema: {
    readonly queryType: {
      readonly name: "Query";
    };
    readonly mutationType: {
      readonly name: "Mutation";
    };
    readonly subscriptionType: null;
    readonly types: readonly [{
      readonly kind: "OBJECT";
      readonly name: "AccumulatorRootCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ActiveJwk";
      readonly fields: readonly [{
        readonly name: "alg";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "e";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "iss";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "kid";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "kty";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "n";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ActiveJwkConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ActiveJwkEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ActiveJwk";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ActiveJwkEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "ActiveJwk";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Address";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "asObject";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "relation";
          readonly type: {
            readonly kind: "ENUM";
            readonly name: "AddressTransactionRelationship";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "AddressAliasStateCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "AddressKey";
      readonly inputFields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }, {
        readonly name: "rootVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "OBJECT";
      readonly name: "AddressOwner";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "AddressTransactionRelationship";
      readonly enumValues: readonly [{
        readonly name: "SENT";
        readonly isDeprecated: false;
      }, {
        readonly name: "AFFECTED";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "AuthenticatorStateCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "AuthenticatorStateExpireTransaction";
      readonly fields: readonly [{
        readonly name: "authenticatorObjInitialSharedVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "minEpoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "AuthenticatorStateUpdateTransaction";
      readonly fields: readonly [{
        readonly name: "authenticatorObjInitialSharedVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "newActiveJwks";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ActiveJwkConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "round";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "AvailableRange";
      readonly fields: readonly [{
        readonly name: "first";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Checkpoint";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "last";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Checkpoint";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Balance";
      readonly fields: readonly [{
        readonly name: "addressBalance";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "coinBalance";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "coinType";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalBalance";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceChange";
      readonly fields: readonly [{
        readonly name: "amount";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "coinType";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceChangeConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "BalanceChangeEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "BalanceChange";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceChangeEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "BalanceChange";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "BalanceEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Balance";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Balance";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BalanceWithdraw";
      readonly fields: readonly [{
        readonly name: "reservation";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "WithdrawalReservation";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "withdrawFrom";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "WithdrawFrom";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "Base64";
    }, {
      readonly kind: "SCALAR";
      readonly name: "BigInt";
    }, {
      readonly kind: "SCALAR";
      readonly name: "Boolean";
    }, {
      readonly kind: "OBJECT";
      readonly name: "BridgeCommitteeInitTransaction";
      readonly fields: readonly [{
        readonly name: "bridgeObjectVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "BridgeStateCreateTransaction";
      readonly fields: readonly [{
        readonly name: "chainIdentifier";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ChangeEpochTransaction";
      readonly fields: readonly [{
        readonly name: "computationCharge";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epochStartTimestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nonRefundableStorageFee";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "protocolConfigs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ProtocolConfigs";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageCharge";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "systemPackages";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Checkpoint";
      readonly fields: readonly [{
        readonly name: "artifactsDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "contentBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "contentDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "networkTotalTransactions";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousCheckpointDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "query";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Query";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "rollingGasSummary";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "GasCostSummary";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sequenceNumber";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "summaryBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "timestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "validatorSignatures";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ValidatorAggregatedSignature";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CheckpointConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "CheckpointEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Checkpoint";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CheckpointEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Checkpoint";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "CheckpointFilter";
      readonly inputFields: readonly [{
        readonly name: "afterCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "atEpoch";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "beforeCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "OBJECT";
      readonly name: "CoinDenyListStateCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CoinMetadata";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "allowGlobalPause";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "decimals";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "denyCap";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObject";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "description";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasPublicTransfer";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "iconUrl";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "moveObjectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "regulatedState";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "RegulatedState";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "supply";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "supplyState";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "SupplyState";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "symbol";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IMoveObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IObject";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CoinRegistryCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "UNION";
      readonly name: "Command";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "MakeMoveVecCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MergeCoinsCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveCallCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "OtherCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "PublishCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "SplitCoinsCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "TransferObjectsCommand";
      }, {
        readonly kind: "OBJECT";
        readonly name: "UpgradeCommand";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CommandConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "CommandEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "Command";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CommandEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "UNION";
            readonly name: "Command";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CommandOutput";
      readonly fields: readonly [{
        readonly name: "argument";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionArgument";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "value";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "CommandResult";
      readonly fields: readonly [{
        readonly name: "mutatedReferences";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "CommandOutput";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "returnValues";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "CommandOutput";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ConsensusAddressOwner";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "startVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ConsensusCommitPrologueTransaction";
      readonly fields: readonly [{
        readonly name: "additionalStateDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "commitTimestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "consensusCommitDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "round";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "subDagIndex";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "ConsensusObjectCancellationReason";
      readonly enumValues: readonly [{
        readonly name: "CANCELLED_READ";
        readonly isDeprecated: false;
      }, {
        readonly name: "CONGESTED";
        readonly isDeprecated: false;
      }, {
        readonly name: "RANDOMNESS_UNAVAILABLE";
        readonly isDeprecated: false;
      }, {
        readonly name: "UNKNOWN";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ConsensusObjectCancelled";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "cancellationReason";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "ConsensusObjectCancellationReason";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ConsensusObjectRead";
      readonly fields: readonly [{
        readonly name: "object";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "DateTime";
    }, {
      readonly kind: "OBJECT";
      readonly name: "Display";
      readonly fields: readonly [{
        readonly name: "errors";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "output";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "DisplayRegistryCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "DynamicField";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasPublicTransfer";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "moveObjectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "value";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "DynamicFieldValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IMoveObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "DynamicFieldConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "DynamicFieldEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "DynamicField";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "DynamicFieldEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "DynamicField";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "DynamicFieldName";
      readonly inputFields: readonly [{
        readonly name: "bcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
      }, {
        readonly name: "literal";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "UNION";
      readonly name: "DynamicFieldValue";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "MoveObject";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveValue";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EndOfEpochTransaction";
      readonly fields: readonly [{
        readonly name: "transactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "EndOfEpochTransactionKindConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "UNION";
      readonly name: "EndOfEpochTransactionKind";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "AccumulatorRootCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "AddressAliasStateCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "AuthenticatorStateCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "AuthenticatorStateExpireTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "BridgeCommitteeInitTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "BridgeStateCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ChangeEpochTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "CoinDenyListStateCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "CoinRegistryCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "DisplayRegistryCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "RandomnessStateCreateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "StoreExecutionTimeObservationsTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "WriteAccumulatorStorageCostTransaction";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EndOfEpochTransactionKindConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "EndOfEpochTransactionKindEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "EndOfEpochTransactionKind";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EndOfEpochTransactionKindEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "UNION";
            readonly name: "EndOfEpochTransactionKind";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Epoch";
      readonly fields: readonly [{
        readonly name: "checkpoints";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CheckpointConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "CheckpointFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "coinDenyList";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "endTimestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epochId";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fundInflow";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fundOutflow";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fundSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "liveObjectSetDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "netInflow";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "protocolConfigs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ProtocolConfigs";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "referenceGasPrice";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "startTimestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "systemPackages";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "systemState";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalCheckpoints";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalGasFees";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalStakeRewards";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalStakeSubsidies";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "totalTransactions";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "validatorSet";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ValidatorSet";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EpochConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "EpochEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Epoch";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EpochEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Epoch";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Event";
      readonly fields: readonly [{
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "eventBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sender";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sequenceNumber";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "timestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactionModule";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveModule";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EventConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "EventEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Event";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "EventEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Event";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "EventFilter";
      readonly inputFields: readonly [{
        readonly name: "afterCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "beforeCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }, {
        readonly name: "sender";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "OBJECT";
      readonly name: "ExecutionError";
      readonly fields: readonly [{
        readonly name: "abortCode";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "constant";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "function";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveFunction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "identifier";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "instructionOffset";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "message";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveModule";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sourceLineNumber";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ExecutionResult";
      readonly fields: readonly [{
        readonly name: "effects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionEffects";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "errors";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "ExecutionStatus";
      readonly enumValues: readonly [{
        readonly name: "SUCCESS";
        readonly isDeprecated: false;
      }, {
        readonly name: "FAILURE";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "FeatureFlag";
      readonly fields: readonly [{
        readonly name: "key";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "value";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "GasCoin";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "GasCostSummary";
      readonly fields: readonly [{
        readonly name: "computationCost";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nonRefundableStorageFee";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageCost";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "GasEffects";
      readonly fields: readonly [{
        readonly name: "gasObject";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasSummary";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "GasCostSummary";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "GasInput";
      readonly fields: readonly [{
        readonly name: "gasBudget";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasPayment";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasPrice";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasSponsor";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "GenesisTransaction";
      readonly fields: readonly [{
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INTERFACE";
      readonly name: "IAddressable";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "Address";
      }, {
        readonly kind: "OBJECT";
        readonly name: "CoinMetadata";
      }, {
        readonly kind: "OBJECT";
        readonly name: "DynamicField";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveObject";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MovePackage";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Object";
      }];
    }, {
      readonly kind: "SCALAR";
      readonly name: "ID";
    }, {
      readonly kind: "INTERFACE";
      readonly name: "IMoveDatatype";
      readonly fields: readonly [{
        readonly name: "abilities";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "MoveAbility";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeParameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveDatatypeTypeParameter";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "MoveDatatype";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveEnum";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveStruct";
      }];
    }, {
      readonly kind: "INTERFACE";
      readonly name: "IMoveObject";
      readonly fields: readonly [{
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasPublicTransfer";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "moveObjectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "CoinMetadata";
      }, {
        readonly kind: "OBJECT";
        readonly name: "DynamicField";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveObject";
      }];
    }, {
      readonly kind: "INTERFACE";
      readonly name: "IObject";
      readonly fields: readonly [{
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "CoinMetadata";
      }, {
        readonly kind: "OBJECT";
        readonly name: "DynamicField";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveObject";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MovePackage";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Object";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Immutable";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Input";
      readonly fields: readonly [{
        readonly name: "ix";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "Int";
    }, {
      readonly kind: "SCALAR";
      readonly name: "JSON";
    }, {
      readonly kind: "OBJECT";
      readonly name: "Linkage";
      readonly fields: readonly [{
        readonly name: "originalId";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "upgradedId";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MakeMoveVecCommand";
      readonly fields: readonly [{
        readonly name: "elements";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "UNION";
              readonly name: "TransactionArgument";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MergeCoinsCommand";
      readonly fields: readonly [{
        readonly name: "coin";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionArgument";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "coins";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "TransactionArgument";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "MoveAbility";
      readonly enumValues: readonly [{
        readonly name: "COPY";
        readonly isDeprecated: false;
      }, {
        readonly name: "DROP";
        readonly isDeprecated: false;
      }, {
        readonly name: "KEY";
        readonly isDeprecated: false;
      }, {
        readonly name: "STORE";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveCallCommand";
      readonly fields: readonly [{
        readonly name: "arguments";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "TransactionArgument";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "function";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveFunction";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveDatatype";
      readonly fields: readonly [{
        readonly name: "abilities";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "MoveAbility";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "asMoveEnum";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveEnum";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "asMoveStruct";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveStruct";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeParameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveDatatypeTypeParameter";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IMoveDatatype";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveDatatypeConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveDatatypeEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveDatatype";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveDatatypeEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveDatatype";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveDatatypeTypeParameter";
      readonly fields: readonly [{
        readonly name: "constraints";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "ENUM";
                readonly name: "MoveAbility";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "isPhantom";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveEnum";
      readonly fields: readonly [{
        readonly name: "abilities";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "MoveAbility";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeParameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveDatatypeTypeParameter";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "variants";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveEnumVariant";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IMoveDatatype";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveEnumConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveEnumEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveEnum";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveEnumEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveEnum";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveEnumVariant";
      readonly fields: readonly [{
        readonly name: "fields";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveField";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveField";
      readonly fields: readonly [{
        readonly name: "name";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "OpenMoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveFunction";
      readonly fields: readonly [{
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "isEntry";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "parameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "OpenMoveType";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "return";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "OpenMoveType";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeParameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveFunctionTypeParameter";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "visibility";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "MoveVisibility";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveFunctionConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveFunctionEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveFunction";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveFunctionEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveFunction";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveFunctionTypeParameter";
      readonly fields: readonly [{
        readonly name: "constraints";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "ENUM";
                readonly name: "MoveAbility";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveModule";
      readonly fields: readonly [{
        readonly name: "bytes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "datatype";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveDatatype";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "datatypes";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveDatatypeConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "disassembly";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "enum";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveEnum";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "enums";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveEnumConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "fileFormatVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "friends";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveModuleConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "function";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveFunction";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "functions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveFunctionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "package";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackage";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "struct";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveStruct";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "structs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveStructConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveModuleConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveModuleEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveModule";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveModuleEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveObject";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "asCoinMetadata";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CoinMetadata";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "asDynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasPublicTransfer";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "moveObjectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IMoveObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveObjectConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveObjectEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveObject";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveObjectEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveObject";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MovePackage";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "linkage";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Linkage";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveModule";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "moduleBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "modules";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveModuleConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "packageAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackage";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "packageBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "packageVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "packageVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeOrigins";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "TypeOrigin";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MovePackageConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MovePackageEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MovePackage";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MovePackageEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MovePackage";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveStruct";
      readonly fields: readonly [{
        readonly name: "abilities";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "MoveAbility";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fields";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveField";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "fullyQualifiedName";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveModule";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "name";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "typeParameters";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveDatatypeTypeParameter";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IMoveDatatype";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveStructConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveStructEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "MoveStruct";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveStructEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveStruct";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveType";
      readonly fields: readonly [{
        readonly name: "abilities";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "MoveAbility";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "layout";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "MoveTypeLayout";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "repr";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "signature";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "MoveTypeSignature";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "MoveTypeLayout";
    }, {
      readonly kind: "SCALAR";
      readonly name: "MoveTypeSignature";
    }, {
      readonly kind: "OBJECT";
      readonly name: "MoveValue";
      readonly fields: readonly [{
        readonly name: "asAddress";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "bcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "display";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Display";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "extract";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [{
          readonly name: "path";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "format";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [{
          readonly name: "format";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "json";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "MoveVisibility";
      readonly enumValues: readonly [{
        readonly name: "PUBLIC";
        readonly isDeprecated: false;
      }, {
        readonly name: "PRIVATE";
        readonly isDeprecated: false;
      }, {
        readonly name: "FRIEND";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "MutateConsensusStreamEnded";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sequenceNumber";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Mutation";
      readonly fields: readonly [{
        readonly name: "executeTransaction";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "ExecutionResult";
          };
        };
        readonly args: readonly [{
          readonly name: "signatures";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "Base64";
                };
              };
            };
          };
        }, {
          readonly name: "transactionDataBcs";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "Base64";
            };
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "NameRecord";
      readonly fields: readonly [{
        readonly name: "contents";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "MoveValue";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "domain";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "parent";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "target";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "atCheckpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INTERFACE";
      readonly name: "Node";
      readonly fields: readonly [{
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "Address";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Checkpoint";
      }, {
        readonly kind: "OBJECT";
        readonly name: "DynamicField";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Epoch";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveObject";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MovePackage";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Object";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Transaction";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Object";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "addressAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "asMoveObject";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObject";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "asMovePackage";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackage";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "balance";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Balance";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balances";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultNameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicFields";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicFieldConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "dynamicObjectField";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "DynamicField";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "DynamicFieldName";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetBalances";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Balance";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetDynamicObjectFields";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "DynamicField";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "DynamicFieldName";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectAt";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "checkpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsAfter";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersionsBefore";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "ObjectFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "owner";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "Owner";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "previousTransaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "receivedTransactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "storageRebate";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "IAddressable";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "IObject";
      }, {
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectChange";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "idCreated";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "idDeleted";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "inputState";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "outputState";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectChangeConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ObjectChangeEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ObjectChange";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectChangeEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "ObjectChange";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ObjectEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Object";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Object";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "ObjectFilter";
      readonly inputFields: readonly [{
        readonly name: "owner";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }, {
        readonly name: "ownerKind";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "OwnerKind";
        };
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "ObjectKey";
      readonly inputFields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "rootVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "OBJECT";
      readonly name: "ObjectOwner";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "OpenMoveType";
      readonly fields: readonly [{
        readonly name: "repr";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "signature";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "OpenMoveTypeSignature";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "OpenMoveTypeSignature";
    }, {
      readonly kind: "OBJECT";
      readonly name: "OtherCommand";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "OwnedOrImmutable";
      readonly fields: readonly [{
        readonly name: "object";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "UNION";
      readonly name: "Owner";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "AddressOwner";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ConsensusAddressOwner";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Immutable";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ObjectOwner";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Shared";
      }];
    }, {
      readonly kind: "ENUM";
      readonly name: "OwnerKind";
      readonly enumValues: readonly [{
        readonly name: "ADDRESS";
        readonly isDeprecated: false;
      }, {
        readonly name: "OBJECT";
        readonly isDeprecated: false;
      }, {
        readonly name: "SHARED";
        readonly isDeprecated: false;
      }, {
        readonly name: "IMMUTABLE";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "PackageCheckpointFilter";
      readonly inputFields: readonly [{
        readonly name: "afterCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "beforeCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "PackageKey";
      readonly inputFields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "version";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "OBJECT";
      readonly name: "PageInfo";
      readonly fields: readonly [{
        readonly name: "endCursor";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasNextPage";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "hasPreviousPage";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "startCursor";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "PerEpochConfig";
      readonly fields: readonly [{
        readonly name: "object";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ProgrammableSystemTransaction";
      readonly fields: readonly [{
        readonly name: "commands";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CommandConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "inputs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionInputConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ProgrammableTransaction";
      readonly fields: readonly [{
        readonly name: "commands";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CommandConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "inputs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionInputConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ProtocolConfig";
      readonly fields: readonly [{
        readonly name: "key";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "value";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ProtocolConfigs";
      readonly fields: readonly [{
        readonly name: "config";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ProtocolConfig";
        };
        readonly args: readonly [{
          readonly name: "key";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "configs";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ProtocolConfig";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "featureFlag";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "FeatureFlag";
        };
        readonly args: readonly [{
          readonly name: "key";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "featureFlags";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "FeatureFlag";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "protocolVersion";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "PublishCommand";
      readonly fields: readonly [{
        readonly name: "dependencies";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "modules";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "Base64";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Pure";
      readonly fields: readonly [{
        readonly name: "bytes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Query";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [{
          readonly name: "address";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "SuiAddress";
          };
        }, {
          readonly name: "atCheckpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "name";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "chainIdentifier";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "checkpoint";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Checkpoint";
        };
        readonly args: readonly [{
          readonly name: "sequenceNumber";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "checkpoints";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CheckpointConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "CheckpointFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "coinMetadata";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "CoinMetadata";
        };
        readonly args: readonly [{
          readonly name: "coinType";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [{
          readonly name: "epochId";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "epochs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "EpochConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "events";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "EventConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "EventFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetAddresses";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Address";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "AddressKey";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetCheckpoints";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Checkpoint";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "UInt53";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetEpochs";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Epoch";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "UInt53";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetObjects";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Object";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "ObjectKey";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetPackages";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MovePackage";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "INPUT_OBJECT";
                  readonly name: "PackageKey";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetTransactionEffects";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "TransactionEffects";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetTransactions";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "Transaction";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "multiGetTypes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "MoveType";
            };
          };
        };
        readonly args: readonly [{
          readonly name: "keys";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "LIST";
              readonly ofType: {
                readonly kind: "NON_NULL";
                readonly ofType: {
                  readonly kind: "SCALAR";
                  readonly name: "String";
                };
              };
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "nameRecord";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "NameRecord";
        };
        readonly args: readonly [{
          readonly name: "name";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "INTERFACE";
          readonly name: "Node";
        };
        readonly args: readonly [{
          readonly name: "id";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "ID";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "object";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [{
          readonly name: "address";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        }, {
          readonly name: "atCheckpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "rootVersion";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectVersions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "address";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        }, {
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "objects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "INPUT_OBJECT";
              readonly name: "ObjectFilter";
            };
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "package";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackage";
        };
        readonly args: readonly [{
          readonly name: "address";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        }, {
          readonly name: "atCheckpoint";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }, {
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "packageVersions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "address";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        }, {
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "VersionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "packages";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MovePackageConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "PackageCheckpointFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "protocolConfigs";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ProtocolConfigs";
        };
        readonly args: readonly [{
          readonly name: "version";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "UInt53";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "serviceConfig";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "ServiceConfig";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "simulateTransaction";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "SimulationResult";
          };
        };
        readonly args: readonly [{
          readonly name: "checksEnabled";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        }, {
          readonly name: "doGasSelection";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Boolean";
          };
        }, {
          readonly name: "transaction";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "JSON";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "transaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [{
          readonly name: "digest";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactionEffects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionEffects";
        };
        readonly args: readonly [{
          readonly name: "digest";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactions";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filter";
          readonly type: {
            readonly kind: "INPUT_OBJECT";
            readonly name: "TransactionFilter";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "type";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveType";
        };
        readonly args: readonly [{
          readonly name: "type";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "verifyZkLoginSignature";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "ZkLoginVerifyResult";
          };
        };
        readonly args: readonly [{
          readonly name: "author";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        }, {
          readonly name: "bytes";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "Base64";
            };
          };
        }, {
          readonly name: "intentScope";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "ENUM";
              readonly name: "ZkLoginIntentScope";
            };
          };
        }, {
          readonly name: "signature";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "Base64";
            };
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "RandomnessStateCreateTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "RandomnessStateUpdateTransaction";
      readonly fields: readonly [{
        readonly name: "epoch";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "randomBytes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "randomnessObjInitialSharedVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "randomnessRound";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ReadConsensusStreamEnded";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sequenceNumber";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Receiving";
      readonly fields: readonly [{
        readonly name: "object";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Object";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "RegulatedState";
      readonly enumValues: readonly [{
        readonly name: "REGULATED";
        readonly isDeprecated: false;
      }, {
        readonly name: "UNREGULATED";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ServiceConfig";
      readonly fields: readonly [{
        readonly name: "availableRange";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "AvailableRange";
          };
        };
        readonly args: readonly [{
          readonly name: "field";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "filters";
          readonly type: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "SCALAR";
                readonly name: "String";
              };
            };
          };
        }, {
          readonly name: "type";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "defaultPageSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [{
          readonly name: "field";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }, {
          readonly name: "type";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxDisassembledModuleSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxDisplayFieldDepth";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxDisplayFormatNodes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxDisplayObjectLoads";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxDisplayOutputSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxMoveValueBound";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxMoveValueDepth";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxMultiGetSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxOutputNodes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxPageSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [{
          readonly name: "field";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }, {
          readonly name: "type";
          readonly type: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "String";
            };
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxQueryDepth";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxQueryNodes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxQueryPayloadSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxRichQueries";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxTransactionPayloadSize";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxTypeArgumentDepth";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxTypeArgumentWidth";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "maxTypeNodes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "mutationTimeoutMs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "queryTimeoutMs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Shared";
      readonly fields: readonly [{
        readonly name: "initialSharedVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "SharedInput";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "initialSharedVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "mutable";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "SimulationResult";
      readonly fields: readonly [{
        readonly name: "effects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionEffects";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "error";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "outputs";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "OBJECT";
              readonly name: "CommandResult";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "SplitCoinsCommand";
      readonly fields: readonly [{
        readonly name: "amounts";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "TransactionArgument";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "coin";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionArgument";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "StoreExecutionTimeObservationsTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "String";
    }, {
      readonly kind: "SCALAR";
      readonly name: "SuiAddress";
    }, {
      readonly kind: "ENUM";
      readonly name: "SupplyState";
      readonly enumValues: readonly [{
        readonly name: "BURN_ONLY";
        readonly isDeprecated: false;
      }, {
        readonly name: "FIXED";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Transaction";
      readonly fields: readonly [{
        readonly name: "digest";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "effects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionEffects";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "expiration";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasInput";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "GasInput";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "id";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "ID";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "kind";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionKind";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "sender";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Address";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "signatures";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "UserSignature";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactionBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transactionJson";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [{
        readonly kind: "INTERFACE";
        readonly name: "Node";
      }];
    }, {
      readonly kind: "UNION";
      readonly name: "TransactionArgument";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "GasCoin";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Input";
      }, {
        readonly kind: "OBJECT";
        readonly name: "TxResult";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransactionConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "TransactionEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Transaction";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransactionEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Transaction";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransactionEffects";
      readonly fields: readonly [{
        readonly name: "balanceChanges";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "BalanceChangeConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "balanceChangesJson";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "checkpoint";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Checkpoint";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dependencies";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "TransactionConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "digest";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "effectsBcs";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "effectsDigest";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "effectsJson";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "JSON";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "events";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "EventConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "executionError";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ExecutionError";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "gasEffects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "GasEffects";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "lamportVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "objectChanges";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ObjectChangeConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "status";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "ExecutionStatus";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "timestamp";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "DateTime";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "transaction";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Transaction";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "unchangedConsensusObjects";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "UnchangedConsensusObjectConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "TransactionFilter";
      readonly inputFields: readonly [{
        readonly name: "affectedAddress";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }, {
        readonly name: "affectedObject";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }, {
        readonly name: "afterCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "atCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "beforeCheckpoint";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "function";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
      }, {
        readonly name: "kind";
        readonly type: {
          readonly kind: "ENUM";
          readonly name: "TransactionKindInput";
        };
      }, {
        readonly name: "sentAddress";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "UNION";
      readonly name: "TransactionInput";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "BalanceWithdraw";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MoveValue";
      }, {
        readonly kind: "OBJECT";
        readonly name: "OwnedOrImmutable";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Pure";
      }, {
        readonly kind: "OBJECT";
        readonly name: "Receiving";
      }, {
        readonly kind: "OBJECT";
        readonly name: "SharedInput";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransactionInputConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "TransactionInputEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "TransactionInput";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransactionInputEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "UNION";
            readonly name: "TransactionInput";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "UNION";
      readonly name: "TransactionKind";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "AuthenticatorStateUpdateTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ChangeEpochTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ConsensusCommitPrologueTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "EndOfEpochTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "GenesisTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ProgrammableSystemTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ProgrammableTransaction";
      }, {
        readonly kind: "OBJECT";
        readonly name: "RandomnessStateUpdateTransaction";
      }];
    }, {
      readonly kind: "ENUM";
      readonly name: "TransactionKindInput";
      readonly enumValues: readonly [{
        readonly name: "SYSTEM_TX";
        readonly isDeprecated: false;
      }, {
        readonly name: "PROGRAMMABLE_TX";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TransferObjectsCommand";
      readonly fields: readonly [{
        readonly name: "address";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionArgument";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "inputs";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "TransactionArgument";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TxResult";
      readonly fields: readonly [{
        readonly name: "cmd";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "ix";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Int";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "TypeOrigin";
      readonly fields: readonly [{
        readonly name: "definingId";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "module";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "struct";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "SCALAR";
      readonly name: "UInt53";
    }, {
      readonly kind: "UNION";
      readonly name: "UnchangedConsensusObject";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "ConsensusObjectCancelled";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ConsensusObjectRead";
      }, {
        readonly kind: "OBJECT";
        readonly name: "MutateConsensusStreamEnded";
      }, {
        readonly kind: "OBJECT";
        readonly name: "PerEpochConfig";
      }, {
        readonly kind: "OBJECT";
        readonly name: "ReadConsensusStreamEnded";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "UnchangedConsensusObjectConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "UnchangedConsensusObjectEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "UNION";
                readonly name: "UnchangedConsensusObject";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "UnchangedConsensusObjectEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "UNION";
            readonly name: "UnchangedConsensusObject";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "UpgradeCommand";
      readonly fields: readonly [{
        readonly name: "currentPackage";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "SuiAddress";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "dependencies";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "SuiAddress";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "modules";
        readonly type: {
          readonly kind: "LIST";
          readonly ofType: {
            readonly kind: "NON_NULL";
            readonly ofType: {
              readonly kind: "SCALAR";
              readonly name: "Base64";
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "upgradeTicket";
        readonly type: {
          readonly kind: "UNION";
          readonly name: "TransactionArgument";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "UserSignature";
      readonly fields: readonly [{
        readonly name: "signatureBytes";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "Validator";
      readonly fields: readonly [{
        readonly name: "atRisk";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "reportRecords";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ValidatorConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ValidatorAggregatedSignature";
      readonly fields: readonly [{
        readonly name: "epoch";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "Epoch";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "signature";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Base64";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "signersMap";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "SCALAR";
                readonly name: "Int";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ValidatorConnection";
      readonly fields: readonly [{
        readonly name: "edges";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "ValidatorEdge";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "nodes";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "LIST";
            readonly ofType: {
              readonly kind: "NON_NULL";
              readonly ofType: {
                readonly kind: "OBJECT";
                readonly name: "Validator";
              };
            };
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "pageInfo";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "PageInfo";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ValidatorEdge";
      readonly fields: readonly [{
        readonly name: "cursor";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "node";
        readonly type: {
          readonly kind: "NON_NULL";
          readonly ofType: {
            readonly kind: "OBJECT";
            readonly name: "Validator";
          };
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ValidatorSet";
      readonly fields: readonly [{
        readonly name: "activeValidators";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "ValidatorConnection";
        };
        readonly args: readonly [{
          readonly name: "after";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "before";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "String";
          };
        }, {
          readonly name: "first";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }, {
          readonly name: "last";
          readonly type: {
            readonly kind: "SCALAR";
            readonly name: "Int";
          };
        }];
        readonly isDeprecated: false;
      }, {
        readonly name: "contents";
        readonly type: {
          readonly kind: "OBJECT";
          readonly name: "MoveValue";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "INPUT_OBJECT";
      readonly name: "VersionFilter";
      readonly inputFields: readonly [{
        readonly name: "afterVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }, {
        readonly name: "beforeVersion";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "UInt53";
        };
      }];
      readonly isOneOf: false;
    }, {
      readonly kind: "ENUM";
      readonly name: "WithdrawFrom";
      readonly enumValues: readonly [{
        readonly name: "SENDER";
        readonly isDeprecated: false;
      }, {
        readonly name: "SPONSOR";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "WithdrawMaxAmountU64";
      readonly fields: readonly [{
        readonly name: "amount";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "BigInt";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "UNION";
      readonly name: "WithdrawalReservation";
      readonly possibleTypes: readonly [{
        readonly kind: "OBJECT";
        readonly name: "WithdrawMaxAmountU64";
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "WriteAccumulatorStorageCostTransaction";
      readonly fields: readonly [{
        readonly name: "_";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }, {
      readonly kind: "ENUM";
      readonly name: "ZkLoginIntentScope";
      readonly enumValues: readonly [{
        readonly name: "TRANSACTION_DATA";
        readonly isDeprecated: false;
      }, {
        readonly name: "PERSONAL_MESSAGE";
        readonly isDeprecated: false;
      }];
    }, {
      readonly kind: "OBJECT";
      readonly name: "ZkLoginVerifyResult";
      readonly fields: readonly [{
        readonly name: "error";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "String";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }, {
        readonly name: "success";
        readonly type: {
          readonly kind: "SCALAR";
          readonly name: "Boolean";
        };
        readonly args: readonly [];
        readonly isDeprecated: false;
      }];
      readonly interfaces: readonly [];
    }];
    readonly directives: readonly [];
  };
};
//#endregion
export { introspection };
//# sourceMappingURL=tada-env.d.mts.map