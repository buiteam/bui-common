var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  BUI = require('../common');

  var Controller = BUI.Component.Controller;


  describe('测试loader', function(){

    describe('测试loader初始化',function(){

      it('测试默认不加载',function(){
        var control = new Controller({
          loader : {
            url : 'data/text',
            autoLoad : false
          }
        });
        var loader = control.get('loader')
        expect(loader.isLoader).to.be(true);
        control.render();
        expect(control.get('loader')).to.be(loader);
      });

      it('测试默认加载', function(done){
        var el = $('<div></div>').prependTo('body'),
          control = new Controller({
            render : el,
            loader : {
              url : 'data/text.json',
              autoLoad : true
            }
          });
        control.render();

        setTimeout(function(){
          expect(el.find('p').length).not.to.be(0);
          done();
        }, 500);

      });

      it('测试通过src生成',function(done){
        var el = $('<div><p>srcNode生成</p></div>').prependTo('body'),
          control = new Controller({
            srcNode : el
          });
        control.render();

        setTimeout(function(){
          expect(el.find('p').length).not.to.be(0);
          done();
        }, 500);
      });
    });

    describe('测试loader加载',function(){

      it('测试加载children', function(done){
        var el = $('<div></div>').prependTo('body'),
          control = new Controller({
            render : el,
            loader : {
              url : 'data/children.json',
              property : 'children',
              dataType : 'json'
            }
          });
        control.render();
        setTimeout(function(){
          expect(control.get('children').length).not.to.be(0);
          expect(control.get('children')[0].isController).to.be(true);
          done();
        }, 500);
      });

      it('测试加载自定义属性', function(done){
        var el = $('<div></div>').prependTo('body'),
          control = new Controller({
            render : el,
            loader : {
              url : 'data/children.json',
              property : 'items',
              dataType : 'json'
            }
          });
        control.render();
        setTimeout(function(){
          expect(control.get('items').length).not.to.be(0);
          done();
        }, 500);
      });

      it('测试回调函数',function(done){
        var callback = sinon.spy(),
          el = $('<div></div>').prependTo('body'),
          control = new Controller({
          render : el,
          loader : {
            url : 'data/text.json',
            callback : callback
          }
        });
        control.render();

        setTimeout(function(){
          expect(callback.called).to.be(true);
          done();
        }, 500);
      });

      it('测试出错',function(){

      });
      it('测试renderer',function(done){
        var customText =  '修改的数据',
          el = $('<div></div>').prependTo('body'),
          control = new Controller({
          render : el,
          loader : {
            url : 'data/text.json',
            renderer : function(text){
              return customText;
            }
          }
        });
        control.render();

        setTimeout(function(){
          expect(control.get('el').text()).to.be(customText);
          done();
        }, 500);
      });
    });

  });
