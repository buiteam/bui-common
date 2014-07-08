var expect = require('expect.js'),
  BUI = require('../common');

var arrayUtil = BUI.Array;

describe('数组基本测试', function(){

  describe('测试查找',function(){
    it('判断是否为空',function(){
      var arr = [];
      expect(arrayUtil.isEmpty(arr)).to.be(true);
      arr.push(1);
      expect(arrayUtil.isEmpty(arr)).not.to.be(true);
    });
    it('测试查找索引',function(){
      var arr = [1,2,3,4];
      expect(arrayUtil.indexOf(3,arr)).to.be(2);
      expect(arrayUtil.indexOf(0,arr)).to.be(-1);
    });

    it('测试是否存在',function(){
      var arr = [1,2,3,4];
      expect(arrayUtil.contains(3,arr)).to.be(true);
      expect(arrayUtil.contains(0,arr)).not.to.be(true);
    });

    it('测试根据匹配方法查找索引',function(){
      var arr = [{id:1},{id:2},{id:3},{id:4}],
        index = arrayUtil.findIndex(arr,function(obj){
          return obj.id == 2;
        });
      expect(index).to.be(1);

    });

    it('测试根据匹配方法查找值',function(){
       var arr = [{id:1},{id:2},{id:3},{id:4}],
        item = arrayUtil.find(arr,function(obj){
          return obj.id == 2;
        });
      expect(item.id).to.be(2);
    });

  });

  describe('测试添加删除',function(){
    it('插入值',function(){
      var arr = [1,2,3],
        pos = 0,
        val = 4;
      arrayUtil.addAt(arr,val,pos);
      expect(arrayUtil.contains(val,arr)).to.be(true);
      expect(arrayUtil.indexOf(val,arr)).to.be(pos);
    });
    it('添加值值',function(){
      var arr = [1,2,3],
        val = 4;
      arrayUtil.add(arr,val);
      expect(arrayUtil.contains(val,arr)).to.be(true);
    });
    it('删除值',function(){
      var arr = [1,2,3,4],
        index = 2,
        val = arr[index];
      arrayUtil.remove(arr,val);
      expect(arr[index]).not.to.be(val);

    });
    it('根据位置删除值',function(){
      var arr = [1,2,3,4],
        index = 2,
        val = arr[index];
      arrayUtil.removeAt(arr,index);
      expect(arr[index]).not.to.be(val);
    });
    it('清空数组值',function(){
      var arr = [1,2];
      expect(arrayUtil.isEmpty(arr)).not.to.be(true);
      arrayUtil.empty(arr);
      expect(arrayUtil.isEmpty(arr)).to.be(true);
    });
  });

  describe('测试工具方法',function(){
    it('测试map',function(){
       var arr = [{id:1},{id:2},{id:3},{id:4}];
       var r = arrayUtil.map(arr,function(v){
        return v.id;
       });
       expect(r.length).to.be(arr.length);
       arrayUtil.each(r,function(v,i){
        expect(v).to.be(arr[i].id);
       });
    });
    it('测试filter',function(){
      var arr = [0,1,2,3,4,5];
      var r = arrayUtil.filter(arr,function(v){
        return v % 2 === 0;
      });
      expect(r.length).to.be(arr.length/2);
    });
  });
  
});
