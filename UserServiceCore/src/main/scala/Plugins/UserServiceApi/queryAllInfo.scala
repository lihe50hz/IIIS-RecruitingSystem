package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended
import Plugins.UserServiceShared.UserInfo

case class queryAllInfo () extends MSAkkaUserServiceMessageExtended[Array[UserInfo]]
