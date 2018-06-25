import DemoComponent from './demo-component';

new DemoComponent({
  typeName: '年龄',
  unit: '年',
  maxValue: 2018,
  minValue: 1938,
  currentValue: 1996
});

new DemoComponent({
  typeName: '身高',
  unit: 'cm',
  maxValue: 230,
  minValue: 100,
  currentValue: 180
});

new DemoComponent({
  typeName: '体重',
  unit: 'kg',
  maxValue: 200,
  minValue: 30,
  currentValue: 76.1,
  precision: 0.1
});
