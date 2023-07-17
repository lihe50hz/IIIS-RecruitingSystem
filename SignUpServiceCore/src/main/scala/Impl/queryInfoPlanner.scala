package Impl

import Plugins.SignUpServiceShared.SignUpInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.SignUpServiceApi.queryInfo
import Tables.SignUpTable
import monix.eval.Task

object queryInfoPlanner extends APIPlanner[queryInfo]{
  override protected def plan(api: queryInfo)(implicit uuid: PlanUUID): Task[SignUpInfo] = {
    SignUpTable.queryInfo(api.userName).flatMap({
      value=>{println("有");Task.now(value)}
    }).onErrorHandle(one =>{println("空",one)
      SignUpInfo("","","","", "","","","","","","",0,false)})
  }
}