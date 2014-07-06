/**
 * @fileOverview uibase的入口文件
 * @ignore
 */
var UIBase = require('./uibase/base');

BUI.mix(UIBase, {
  Align: require('./uibase/align'),
  AutoShow: require('./uibase/autoshow'),
  AutoHide: require('./uibase/autohide'),
  Close: require('./uibase/close'),
  Collapsable: require('./uibase/collapsable'),
  Drag: require('./uibase/drag'),
  KeyNav: require('./uibase/keynav'),
  List: require('./uibase/list'),
  ListItem: require('./uibase/listitem'),
  Mask: require('./uibase/mask'),
  Position: require('./uibase/position'),
  Selection: require('./uibase/selection'),
  StdMod: require('./uibase/stdmod'),
  Decorate: require('./uibase/decorate'),
  Tpl: require('./uibase/tpl'),
  ChildCfg: require('./uibase/childcfg'),
  Bindable: require('./uibase/bindable'),
  Depends: require('./uibase/depends')
});

BUI.mix(UIBase, {
  CloseView: UIBase.Close.View,
  CollapsableView: UIBase.Collapsable.View,
  ChildList: UIBase.List.ChildList,
  /*DomList : UIBase.List.DomList,
  DomListView : UIBase.List.DomList.View,*/
  ListItemView: UIBase.ListItem.View,
  MaskView: UIBase.Mask.View,
  PositionView: UIBase.Position.View,
  StdModView: UIBase.StdMod.View,
  TplView: UIBase.Tpl.View
});

module.exports = UIBase;
