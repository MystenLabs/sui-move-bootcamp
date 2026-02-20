import { TypeTag as TypeTag$1 } from "./types.mjs";
import * as _mysten_bcs810 from "@mysten/bcs";
import { BcsType } from "@mysten/bcs";

//#region src/bcs/bcs.d.ts

declare const TypeTag: BcsType<string, string | TypeTag$1, string>;
declare function IntentMessage<T extends BcsType<any>>(T: T): _mysten_bcs810.BcsStruct<{
  intent: _mysten_bcs810.BcsStruct<{
    scope: _mysten_bcs810.BcsEnum<{
      TransactionData: null;
      TransactionEffects: null;
      CheckpointSummary: null;
      PersonalMessage: null;
    }, "IntentScope">;
    version: _mysten_bcs810.BcsEnum<{
      V0: null;
    }, "IntentVersion">;
    appId: _mysten_bcs810.BcsEnum<{
      Sui: null;
    }, "AppId">;
  }, string>;
  value: T;
}, string>;
//#endregion
export { IntentMessage, TypeTag };
//# sourceMappingURL=bcs.d.mts.map