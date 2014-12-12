var $ = require('jquery'), 
	expect = require('expect.js'),
	sinon = require('sinon'),
  BUI = require('../common');

describe('uitl测试', function(){

  describe("测试 extend 继承", function () {

    function base(){
      this.name = 'base';
    }

    base.prototype = {
      method1 : function(){
        
      }
    };

    var subClass = function(){
      this.name = 'subclass';
    }
    
    subClass.prototype ={
      method : function(){}
    };
    BUI.extend(subClass,base,{
      method2:function(){

      }
    });

    var sub2 = BUI.extend(subClass,{
      method3 :function(){}
    });

    var obj = new subClass(),
      obj1 = new sub2();

    it('测试继承',function(){
      expect(obj instanceof base).to.be(true);
      expect(obj instanceof subClass).to.be(true);
      expect(obj1 instanceof subClass).to.be(true);
    });

    it('测试原有的方法',function(){
      expect(obj.method).not.to.be(undefined);
    });
    it('测试继承的方法',function(){
      expect(obj.method1).not.to.be(undefined);
    });

    it('测试自定义的方法',function(){
      expect(obj.method2).not.to.be(undefined);
    });

    it('测试构造函数',function(){
      expect(obj.constructor).to.be(subClass);
    });

    it('测试调用父类的方法',function(){
      expect(obj.constructor.superclass.constructor).to.be(base);
    });

    it('测试直接生成子类',function(){
      expect(obj1.method1).not.to.be(undefined);
      expect(obj1.method2).not.to.be(undefined);
      expect(obj1.method2).not.to.be(undefined);
      expect(obj1.constructor.superclass.constructor).to.be(subClass);
    })
  });

  describe("测试 mixin 扩展", function () {
    
    function a(){
    
    }

    a.ATTRS = {
      p1 : {
        v1:'1',
        v2 : '2',
        v4:'4'
      }
    }

    b.ATTRS = {
      p1 : {
        v1:'b1',
        v2 : 'b2',
        v3:'b3'
      },
      p2 : {
        v : 'b1'
      }
    }

    function b(){
      
    }

    BUI.augment(b,{
      m1 : function(){
      
      }
    });

    BUI.mixin(a,[b]);

    it('测试扩展方法',function(){
      var a1 = new a();
      expect(a1.m1).not.to.be(undefined);
    
    });

    it('测试扩展属性',function(){

      expect(a.ATTRS.p1.v1).to.be('1');
      expect(a.ATTRS.p1.v3).to.be('b3');
      expect(a.ATTRS.p1.v4).to.be('4');
      expect(a.ATTRS.p2.v).to.be('b1');
    
    });
  });

  describe("测试命名空间",function(){

    it("测试创建命名空间",function(){
      expect(BUI.test).to.be(undefined);

      BUI.namespace('test.unit');

      expect(BUI.test).not.to.be(undefined);
      expect(BUI.test.unit).not.to.be(undefined);
      
      BUI.test.a = 'test';
      var obj = {};
      BUI.test.obj = obj;
      BUI.namespace('test.a');
      expect(BUI.test.a).to.be('test');
      expect(BUI.test.obj).to.be(obj) ;

    });
  });

  describe("测试原型链扩展", function () {
  
    it('测试扩展一个对象',function(){
      function a(){
      
      }

      BUI.augment(a,{
        method1 : function(){
          
        }
      });
      var a1=new a();
      expect(a.method1).to.be(undefined);
      expect(a1.method1).not.to.be(undefined);
    });

    it('测试多个扩展',function(){
      function a(){
      
      }

      BUI.augment(a,{
        method1 : function(){
          return 1;
        }
      },{
        method1 : function(){
          return 2;
        },
        method2 : function(){
          return 2;
        }
      });
      var a1=new a();
      expect(a.method1).to.be(undefined);
      expect(a1.method1).not.to.be(undefined);
      expect(a1.method1()).to.be(2);
    });
  });
  
  describe("测试事件",function(){

    var A = function(){
      this.addEvents(['click','up']);
    }
    BUI.extend(A, BUI.Observable);
    
    var a = new A(),
      callback = sinon.spy(),
      callback1 = sinon.spy();

    a.on('click', callback);

    it('测试事件触发',function(){
      a.fire('click');
      expect(callback.called).to.be(true);
    });

    it('测试移除事件',function(){
      callback.reset();
      a.off('click', callback);
      a.fire('click');
      expect(callback.called).not.to.be(true);
    });

    it('测试添加多个事件',function(){
      a.on('up',callback);
      a.on('up',callback1);
      var obj = {a:123};
      a.fire('up',obj);
      expect(callback.calledWith(obj)).to.be(true);
      expect(callback1.calledWith(obj)).to.be(true);
      
    });

    it('阻止事件',function(){
      a.pauseEvent('up');
      var newCal = sinon.spy();
      a.on('up',newCal);
      var obj ={a:123};
      a.fire('up',obj);
      expect(newCal.called).to.be(false);

      a.resumeEvent('up');
      var obj ={a:123};
      a.fire('up',obj);
      expect(newCal.called).to.be(true);

    });

    it('移除所有事件',function(){
      callback.reset();
      a.clearListeners();
      a.fire('up');
      expect(callback.called).not.to.be(true);
    });
    
  });

  describe("测试拷贝",function(){
    it('测试深拷贝',function(){
      var obj = {a:{},b:{c:{}}},
        obj1 = BUI.cloneObject(obj);
      expect(obj).not.to.be(obj1);

      expect(obj.a).not.to.be(obj1.a);
      expect(obj.b.c).not.to.be(obj1.b.c);
    });  
    
    it('测试合并对象',function(){
      var a = {a:'a'},
        b = {b:'b'};
      var c = BUI.merge(a,b);
      expect(c).not.to.be(a);
      expect(a.a).to.be(c.a);
      expect(b.b).to.be(c.b);
    });
  });

  describe("测试Base类", function () {

    function A(config){
      A.superclass.constructor.call(this,config)
    }

    A.ATTRS = {
      m1 : {
        value : 1
      }
    };
    BUI.extend(A, BUI.Base);

    var a = new A({m2:2});

    it('测试初始值',function(){
      expect(a.get('m1')).to.be(1);
      expect(a.get('m2')).to.be(2);
    })

    it('添加属性，获取默认值',function(){
      var val = 2;
      a.addAttr('a1',{value:val});
      expect(a.get('a1')).to.be(val);
    });

    it('设置属性，获取属性',function(){
      var val = 3;
      a.set('a2',val);
      expect(a.get('a2')).to.be(val);
    });

    it('设置属性，触发事件',function(){
      var val = 4;
      var callback = sinon.spy();
      a.on('afterA1Change', callback);

      a.set('a1', val, {silent: 1});
      expect(callback.called).to.be(false);

      a.set('a1', 5);
      expect(callback.called).to.be(true);

      a.off('afterA1Change', callback);
    });


    it('清除属性',function(){
      a.removeAttr('a1');
      expect(a.get('a1')).to.be(undefined);
    });

    it('获取动态属性',function(){
      var val = 2;
      a.addAttr('b',{getter:function(value){
        return value * 2;
      }});

      a.set('b',val);
      expect(a.get('b')).to.be(val*2);
    });

  });

  describe("测试UIBase 基类",function(){

    function A(){

    }

    BUI.extend(A,BUI.Component.UIBase);

    var B = BUI.Component.UIBase.extend({

    });
    var b = new B();
    it('检测基础属性',function(){
      expect(b.get('rendered')).to.be(false);

      b.render();
      expect(b.get('rendered')).to.be(true);
    });
    
  });

  describe("测试控件基类 cotroller ",function(){

    
    it("生成控件",function(){
      var control = new BUI.Component.Controller({
        render : '#c1',
        content : '<p>第一个控件</p>',
        allowTextSelection : true
      });
      control.render();
      expect(control).not.to.be(undefined);
      expect(control.get('el')).not.to.be(undefined);
    });

    it("生成多个控件",function(){
      var control = new BUI.Component.Controller({
        render : '#c2',
        content : '第二个控件',
        children : [
          {
            id:'1',
            xclass : 'controller',
            children : [
              {
                id:'2',
                xclass : 'controller',
                content :'22'
              },
              {
                id:'3',
                xclass : 'controller',
                content :'20'
              }
            ],
            content :'21'
          },{
            id:'4',
            xclass : 'controller',
            content :'22'
          }  
        ]

      });
      control.render();
      var el = control.get('el'),
        children = el.children();
      expect(children.length).to.be(2);
    });

    it("测试事件",function(){
      var callback = sinon.spy(),
        control = new BUI.Component.Controller({
        content : '<p>第三个控件</p>',
        allowTextSelection : true,
        listeners : {
          'click' : callback
        }
      });
      control.render();
      control.fire('click');
      expect(callback.called).to.be(true);
    });
  });
  
  describe('测试 decorate',function(){
    
    it('测试封装控件生成',function(){
      var cls ='test-cls',
        el = $('<div id="c4">这是一个封装的控件</div>').prependTo('body'),
        control = new BUI.Component.Controller({
        srcNode : el,
        elCls : cls
      });
      control.render();

      expect(control.get('id')).to.be('c4');
      expect(control.get('el').hasClass(cls)).to.be(true);
      expect(control.get('el').html()).to.be($('#c4').html());
    });
    /**/
    it('测试封装控件读取属性',function(){
      var el = $('<div id="c5" name="t1" title="测试封装控件" data-value="test"><a href="#">这是复杂的封装控件</a></div>'),
        control = new BUI.Component.Controller({
        srcNode : el
      });
      control.render();

      expect(control.get('title')).to.be(el.attr('title'));
      expect(control.get('value')).to.be(el.attr('data-value'));
      expect(control.get('el').html()).to.be(el.html());
    });

    describe('测试复杂属性',function(){
      var el = $('<div data-bl-true="true" data-bl-false="false" data-num-a="123" data-num-b="a234" data-value="test"><a href="#">这是复杂的封装控件</a></div>'),
        control = new BUI.Component.Controller({
        srcNode : el
      });
      control.render();
      it('测试属性名称',function(){
        expect(control.get('blTrue')).not.to.be(null);
      });
      it('测试Boolean类型',function(){
        expect(control.get('blTrue')).to.be(true);
        expect(control.get('blFalse')).to.be(false);
      });

      it('测试数字类型',function(){
        expect(control.get('numA')).to.be(123);
        expect(control.get('numB')).to.be('a234');
      });



    });


    
    it('测试封装控件，封装子控件',function(){

      var AClass = BUI.Component.Controller.extend({},{
        ATTRS : {
          defaultChildClass : {
            value : 'classb'
          }
        }
      },{
        xclass : 'classa'
      });

      var BClass = BUI.Component.Controller.extend({},{
        PARSER : {
          a : function(el){
            return el.text();
          }
        }
      },{
        xclass : 'classb'
      });

      var node = $('<ol><li>1</li><li class="bui-classb-disabled">2</li><li>3</li><li>4</li><li>5</li></ol>').appendTo('body'),

        control = new AClass({
          srcNode : node,
          isDecorateChild : true
        });

      control.render();
      var children = control.get('children'),
        nodeChildren = node.children();
      expect(control.get('el').hasClass('bui-classa')).to.be(true);
      expect(children.length).to.be(nodeChildren.length);
      BUI.each(children,function(item){
        expect(item instanceof(BClass)).to.be(true);
        expect(item.get('el').length).not.to.be(0);
        expect(item.get('a')).to.be(item.get('el').text());
      });
    });
  });


  describe("测试控件查找 ",function(){
    var el = $('<div></div>').prependTo('body'),
      control = new BUI.Component.Controller({
        render : el,
        content : '第三个控件',
        children : [
          {
            id:'1',
            xclass : 'controller',
            children : [
              {
                id:'2',
                xclass : 'controller',
                content :'22'
              },
              {
                id:'3',
                xclass : 'controller',
                content :'20'
              }
            ],
            content :'21'
          },{
            id:'4',
            xclass : 'controller',
            content :'22'
          }  
        ]

    });
    control.render();

    it('测试查找',function(){
      var id = '1';
      expect(control.getChild(id)).not.to.be(null);
    });

   
    
    it('测试级联查找',function(){
      var id = '2';
      expect(control.getChild(id)).to.be(null);
      expect(control.getChild(id,true)).not.to.be(null);
    });

     it('测试级查找多个',function(){
      var items = control.getChildrenBy(function(item){
        return item.get('content') === '22';
      },true);
      expect(items.length).to.be(2);

    });

     it('测试删除',function(){
      var id = '4',
          control1 = control.getChild(id);
      expect(control1).not.to.be(null);
      control1.remove(true);
      expect(control.getChild(id)).to.be(null);
    })
  });

  describe('测试json',function(){

    it('测试函数存在',function(){
      expect(BUI.JSON).not.to.be(undefined);
      expect(BUI.JSON.parse).not.to.be(undefined);
      expect(BUI.JSON.stringify).not.to.be(undefined);
    });

    it('测试格式化json成字符串',function(){
      var obj = {a:123},
        str = '{"a":123}';
      expect(BUI.JSON.stringify(obj)).to.be(str);
    });

    it('测试格式化宽松的json字符串',function(){
      var str = '{a:123}',
        obj = BUI.JSON.looseParse(str);
      expect(obj).not.to.be(undefined);
      expect(obj.a).to.be(123);
    });
    
  });

  describe('测试unparam', function(){
    it('测试转换', function(){
      var str = 'a=1&b=2';
      expect(BUI.unparam(str)).to.eql({a:1,b:2});
    });

    it('存在中文', function(){
      var str = 'a=中文';
      expect(BUI.unparam(str)).to.eql({a:'中文'});
    });

    it('中文转义', function() {
      var str = 'a=%E4%B8%AD%E6%96%87';
      expect(BUI.unparam(str)).to.eql({a:'中文'});
    })
  });
});
/**/
/**/
