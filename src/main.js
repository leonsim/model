function r() {
  var metas = document.getElementsByTagName('meta');
  for (var i=0; i<metas.length; i++) {
    if (metas[i].getAttribute('name') === 'author') {
      if (metas[i].getAttribute('content').indexOf('1e0n') === 0) {
        for (var key in s) {
          if (s.hasOwnProperty(key)) {
            var v = s[key].value();
            v = Math.round(v * 100) / 100;
            d3.select('.' + key + ' .text').text(v);
          }
        }
        t(); u(); b(); gr(); gs();
      }
      break;
    }
  }
}
var s = {};

function g(name, ticks, min, max, value, step) {
  s[name] = d3.slider();
  if (Object.prototype.toString.call(ticks) === '[object Array]') {
    s[name].axis(d3.axisBottom().tickValues(ticks));
  }
  else {
    s[name].axis(d3.axisBottom().ticks(ticks));
  }
  s[name].min(min).max(max).value(value).step(step)
    .on('slide', function(evt, value) {
      if (name == 'percent-for-teaching') {
        s['percent-for-office'].value(100 - value);
      }
      if (name == 'percent-for-office') {
        s['percent-for-teaching'].value(100 - value);
      }
      var metas = document.getElementsByTagName('meta');
      var meta = '';
      for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute('name') === 'author') {
          if (metas[i].getAttribute('content').indexOf('1e0n') >= 0 && d3.select('.footer').text().indexOf('Mala') > 30) {
            r();
          }
        }
      }
    });
  d3.select('.' + name + ' .graph').call(s[name]);
}
function o(k, v) {
  v = Math.round(v * 100) / 100;
  d3.selectAll('.' + k + '.text').text(v);
}

function gv(t) {
  var ans = parseFloat(t);
  if (t.endsWith('%')) {
    ans = ans / 100;
  }
  return Math.round(ans * 100) / 100;
}
function w(k) {
  return gv(d3.select('.' + k + '.text').text());
}
function ss() {
  var i;
  var sum = 0;
  for (i = 0; i < arguments.length; ++i) {
    sum += w(arguments[i]);
  }
  return sum;
}

function t() {
  o('start-fund', s['start-fund-in-10k'].value() * 10000);
  o('rent-deposite', s['rent-deposite-in-k'].value() * 1000);
  o('rent-first-year', s['area'].value() * s['rent-per-square'].value() * s['rent-month-first-year'].value());
  o('rent-second-year', s['area'].value() * s['rent-per-square'].value() * s['rent-month-second-year'].value());
  o('property-cost-first-year', s['area'].value() * s['rent-month-first-year'].value() * s['property-cost-per-square'].value());
  o('property-cost-second-year', s['area'].value() * s['rent-month-second-year'].value() * s['property-cost-per-square'].value());
  o('decoration-cost', s['area'].value() * s['decoration-cost-per-square'].value());
  o('device-cost', s['device-price'].value() * s['classrooms'].value());
  o('desk-cost', s['desks'].value() * s['desk-price'].value());
  var v = s['salary'].value() * s['hr-first-year'].value() * s['op-month-first-year'].value();
  var v2 = s['salary'].value() * s['hr-second-year'].value() * s['op-month-second-year'].value();
  o('salary-cost-first-year', v);
  o('salary-cost-second-year', v2);
  o('social-security-cost-first-year', v * s['social-security'].value() / 100);
  o('social-security-cost-second-year', v2 * s['social-security'].value() / 100);
  o('cpf-cost-first-year', v * s['cpf'].value() / 100);
  o('cpf-cost-second-year', v2 * s['cpf'].value() / 100);

  o('initial-fee', s['initial-fee-in-10k'].value() * 10000);
  o('constant-cost-first-year', ss('rent-deposite', 'rent-first-year', 'property-cost-first-year', 'decoration-cost', 'device-cost', 'desk-cost', 'salary-cost-first-year', 'social-security-cost-first-year', 'cpf-cost-first-year', 'initial-fee'));
  o('constant-cost-second-year', ss('rent-second-year', 'property-cost-second-year', 'salary-cost-second-year', 'social-security-cost-second-year', 'cpf-cost-second-year'));
  o('first-year-constant-reminder', w('start-fund') - w('constant-cost-first-year'));

  o('p2p-income-first-year', s['p2p-student-first-year'].value() * s['p2p-avg-charge'].value());
  o('p2p-income-second-year', s['p2p-student-second-year'].value() * s['p2p-avg-charge'].value());
  o('sm-income-first-year', s['sm-student-first-year'].value() * s['sm-avg-charge'].value());
  o('sm-income-second-year', s['sm-student-second-year'].value() * s['sm-avg-charge'].value());
  o('bg-income-first-year', s['bg-student-first-year'].value() * s['bg-avg-charge'].value());
  o('bg-income-second-year', s['bg-student-second-year'].value() * s['bg-avg-charge'].value());

  o('total-income-first-year', ss('p2p-income-first-year', 'sm-income-first-year', 'bg-income-first-year'));
  o('total-income-second-year', ss('p2p-income-second-year', 'sm-income-second-year', 'bg-income-second-year'));

  o('support-cost-first-year', w('total-income-first-year') * s['support-commission'].value() / 100);
  o('support-cost-second-year', w('total-income-second-year') * s['support-commission'].value() / 100);

  v = (w('p2p-income-first-year') * s['p2p-avg-complete-rate'].value() + w('sm-income-first-year') * s['sm-avg-complete-rate'].value() + w('bg-income-first-year') * s['bg-avg-complete-rate'].value()) / 100;
  v2 = (w('p2p-income-second-year') * s['p2p-avg-complete-rate'].value() + w('sm-income-second-year') * s['sm-avg-complete-rate'].value() + w('bg-income-second-year') * s['bg-avg-complete-rate'].value()) / 100;
  o('vat-first-year', v * s['vat'].value() / 100);
  o('vat-second-year', v2 * s['vat'].value() / 100);
  o('local-tax-first-year', w('vat-first-year') * s['local-tax'].value() / 100);
  o('local-tax-second-year', w('vat-second-year') * s['local-tax'].value() / 100);
  o('sales-commission-first-year', w('total-income-first-year') * s['sales-commission'].value() / 100);
  o('sales-commission-second-year', w('total-income-second-year') * s['sales-commission'].value() / 100);

  o('pay-p2p-teacher-first-year', w('p2p-income-first-year') * s['p2p-avg-complete-rate'].value() * s['pay-teacher-percent-for-p2p'].value() / 10000);
  o('pay-p2p-teacher-second-year', w('p2p-income-second-year') * s['p2p-avg-complete-rate'].value() * s['pay-teacher-percent-for-p2p'].value() / 10000);
  o('pay-class-teacher-first-year', (w('sm-income-first-year') * s['sm-avg-complete-rate'].value() + w('bg-income-first-year') * s['bg-avg-complete-rate'].value()) * s['pay-teacher-percent-for-class'].value() / 10000);
  o('pay-class-teacher-second-year', (w('sm-income-second-year') * s['sm-avg-complete-rate'].value() + w('bg-income-second-year') * s['bg-avg-complete-rate'].value()) * s['pay-teacher-percent-for-class'].value() / 10000);
  o('market-cost-first-year', v * s['market-cost-percent'].value() / 100);
  o('market-cost-second-year', v2 * s['market-cost-percent'].value() / 100);

  o('tutoring-cost-first-year', s['tutoring-cost-first-year'].value());
  o('tutoring-cost-second-year', s['tutoring-cost-second-year'].value());
  o('water-elec-cost-first-year', s['water-elec-cost-first-year'].value());
  o('water-elec-cost-second-year', s['water-elec-cost-second-year'].value());

  o('office-material-cost-first-year', s['hr-first-year'].value() * s['op-month-first-year'].value() * s['office-material-cost-per-person'].value());
  o('office-material-cost-second-year', s['hr-second-year'].value() * s['op-month-second-year'].value() * s['office-material-cost-per-person'].value());
  o('finance-cost-first-year', w('total-income-first-year') * s['credit-card-fee-percent'].value() * s['credit-card-contrib'].value() / 10000);
  o('finance-cost-second-year', w('total-income-second-year') * s['credit-card-fee-percent'].value() * s['credit-card-contrib'].value() / 10000);

  o('var-cost-first-year', ss('support-cost-first-year', 'vat-first-year', 'local-tax-first-year', 'sales-commission-first-year', 'pay-p2p-teacher-first-year', 'pay-class-teacher-first-year', 'market-cost-first-year', 'tutoring-cost-first-year', 'water-elec-cost-first-year', 'office-material-cost-first-year', 'finance-cost-first-year'));
  o('var-cost-second-year', ss('support-cost-second-year', 'vat-second-year', 'local-tax-second-year', 'sales-commission-second-year', 'pay-p2p-teacher-second-year', 'pay-class-teacher-second-year', 'market-cost-second-year', 'tutoring-cost-second-year', 'water-elec-cost-second-year', 'office-material-cost-second-year', 'finance-cost-second-year'));

  o('first-year-var-reminder', w('total-income-first-year') - w('var-cost-first-year'));
  o('second-year-var-reminder', w('total-income-second-year') - w('var-cost-second-year'));
  o('first-year-reminder', w('first-year-var-reminder') + w('first-year-constant-reminder'));

  o('second-year-constant-reminder', w('first-year-reminder') - w('constant-cost-second-year'));

  o('second-year-reminder', w('second-year-var-reminder') + w('second-year-constant-reminder'));
}
function p(y, k, v) {
  v = '' + v;
  if (v.endsWith('%')) {
    v = Math.round(parseFloat(v) * 100) / 100 + '%';
  }
  else {
    v = Math.round(v * 100) / 100;
  }
  d3.selectAll('.' + k + '-yearly td.text:nth-child(' + (y+1) + ')').text(v);
}
function x(y, k) {
  return gv(d3.select('.' + k + '-yearly td.text:nth-child(' + (y+1) + ')').text());
}
function u() {
  var i;
  for (i = 1; i <= 5; ++i) {
    v(i);
  }
}
function v(y) {
  var yn = (y === 1 ? 'first' : 'second');
  p(y, 'p2p-income', w('p2p-income-' + yn + '-year') * s['p2p-avg-complete-rate'].value() / 100 / (1 + s['vat'].value() / 100));
  p(y, 'sm-income', w('sm-income-' + yn + '-year') * s['sm-avg-complete-rate'].value() / 100 / (1 + s['vat'].value() / 100));
  p(y, 'bg-income', w('bg-income-' + yn + '-year') * s['bg-avg-complete-rate'].value() / 100 / (1 + s['vat'].value() /100));
  p(y, 'income', x(y, 'p2p-income') + x(y, 'sm-income') + x(y, 'bg-income'));

  p(y, 'tax-about', x(y, 'income') * s['vat'].value() / 100 * s['local-tax'].value() / 100);

  p(y, 'pay-teacher', (x(y, 'p2p-income') * s['pay-teacher-percent-for-p2p'].value() + (x(y, 'sm-income') + x(y, 'bg-income')) * s['pay-teacher-percent-for-class'].value()) / 100);
  p(y, 'rent', s['area'].value() * s['rent-month-' + yn + '-year'].value() * s['rent-per-square'].value() * s['percent-for-teaching'].value() / 100);
  p(y, 'teaching-material-cost', (s['p2p-student-' + yn + '-year'].value() + s['sm-student-' + yn + '-year'].value() + s['bg-student-' + yn + '-year'].value()) * s['course-material-cost'].value());
  p(y, 'running-cost', x(y, 'pay-teacher') + x(y, 'rent') + x(y, 'teaching-material-cost'));

  p(y, 'profit', x(y, 'income') - x(y, 'tax-about') - x(y, 'running-cost'));

  p(y, 'gross-margin', x(y, 'profit') / x(y, 'income') * 100 + '%');

  p(y, 'hr-cost', s['hr-' + yn + '-year'].value() * s['salary'].value() * s['op-month-' + yn + '-year'].value() * (1 + s['social-security'].value() / 100 + s['cpf'].value() / 100) + s['sales-commission'].value() / 100 * w('total-income-' + yn + '-year') + w('tutoring-cost-' + yn + '-year'));
  p(y, 'market-cost', w('market-cost-' + yn + '-year'));
  p(y, 'op-cost', s['hr-' + yn + '-year'].value() * s['office-material-cost-per-person'].value() * s['op-month-' + yn + '-year'].value() + w('total-income-' + yn + '-year') * s['support-commission'].value() / 100 + s['initial-fee-in-10k'].value() * 10000 / 36 * s['op-month-' + yn + '-year'].value());
  p(y, 'admin-cost', s['area'].value() * s['percent-for-office'].value() / 100 * s['rent-month-' + yn + '-year'].value() * s['rent-per-square'].value() + w('property-cost-' + yn + '-year') + w('water-elec-cost-' + yn + '-year'));
  p(y, 'finance-cost', w('total-income-' + yn + '-year') * s['credit-card-fee-percent'].value() / 100 * s['credit-card-contrib'].value() / 100);
  p(y, 'decoration-cost', s['area'].value() * s['decoration-cost-per-square'].value() / s['rent-months'].value() * (s['op-month-' + yn + '-year'].value() - 1));
  p(y, 'furniture-cost', (w('device-cost') + w('desk-cost')) / 60 * (s['op-month-' + yn + '-year'].value() - 1));
  p(y, 'indirect-cost', x(y, 'hr-cost') + x(y, 'market-cost') + x(y, 'op-cost') + x(y, 'admin-cost') + x(y, 'finance-cost') + x(y, 'decoration-cost') + x(y, 'furniture-cost'));

  p(y, 'net-income', x(y, 'profit') - x(y, 'indirect-cost'));

  p(y, 'other-income', s['other-income-' + yn + '-year'].value());
  p(y, 'other-cost', s['other-cost-' + yn + '-year'].value());

  p(y, 'pre-tax-profit', x(y, 'net-income') + x(y, 'other-income') - x(y, 'other-cost'));

  p(y, 'entra-tax', x(y, 'pre-tax-profit') > 30000 ? (x(y, 'pre-tax-profit') * 0.25) : (x(y, 'pre-tax-profit') * 0.2));
  p(y, 'after-tax-profit', x(y, 'pre-tax-profit') - x(y, 'entra-tax'));
  p(y, 'net-income-rate', x(y, 'after-tax-profit') / x(y, 'income') * 100 + '%');
}

function m(k) {
  p(6, k, x(1, k) / x(1, 'income') * 100 + '%');
}
function b() {
  m('income');
  m('pay-teacher');
  m('rent');
  m('teaching-material-cost');
  m('running-cost');

  p(6, 'gross-margin', x(1, 'profit') / x(1, 'income') * 100 + '%');

  m('hr-cost');
  m('market-cost');
  m('op-cost');
  m('admin-cost');
  m('finance-cost');
  m('decoration-cost');
  m('furniture-cost');
  m('indirect-cost');

  m('net-income');
  m('other-income');
  m('other-cost');

  m('entra-tax');

  p(6, 'net-income-rate', x(1, 'after-tax-profit') / x(1, 'income') * 100 + '%');
}


g('area', 10, 200, 2000, 300, 50);
g('rent-per-square', 7, 0, 300, 40, 1);
g('rent-months', 10, 0, 120, 36, 6);
g('property-cost-per-square', 11, 0, 20, 2, 1);
g('op-month-first-year', 13, 0, 12, 6, 1);
g('rent-month-first-year', 13, 0, 12, 6, 1);
g('op-month-second-year', 13, 0, 12, 12, 1);
g('rent-month-second-year', 13, 0, 12, 12, 1);

g('classrooms', 13, 0, 30, 18, 1);
g('decoration-cost-per-square', 11, 0, 2000, 700, 10);
g('hr-first-year', 11, 0, 100, 10, 1);
g('hr-second-year', 11, 0, 100, 10, 1);
g('salary', 11, 1000, 5000, 2000, 100);
g('desks', 11, 0, 200, 30, 1);
g('desk-price', 10, 100, 1000, 500, 10);
g('device-price', 10, 500, 5000, 3000, 100);

g('p2p-student-first-year', 10, 0, 500, 80, 10);
g('p2p-student-second-year', 10, 0, 500, 150, 10);
g('p2p-avg-charge', 9, 0, 16000, 8000, 1000);
g('p2p-avg-complete-rate', 10, 0, 100, 80, 5);

g('sm-student-first-year', 10, 0, 500, 60, 10);
g('sm-student-second-year', 10, 0, 500, 140, 10);
g('sm-avg-charge', 5, 0, 4000, 2000, 100);
g('sm-avg-complete-rate', 10, 0, 100, 95, 5);

g('bg-student-first-year', 10, 0, 500, 100, 10);
g('bg-student-second-year', 10, 0, 500, 160, 10);
g('bg-avg-charge', 9, 0, 1600, 800, 100);
g('bg-avg-complete-rate', 10, 0, 100, 95, 5);

g('sales-commission', 10, 0, 50, 5, 1);
g('course-material-cost', 10, 0, 100, 20, 5);

g('pay-teacher-percent-for-p2p', 10, 0, 100, 40, 1);
g('pay-teacher-percent-for-class', 10, 0, 100, 30, 1);

g('vat', d3.range(0, 9, 3), 0, 6, 3, 3);
g('local-tax', 10, 0, 30, 12, 1);

g('credit-card-fee-percent', 10, 0, 3, 0.78, 0.01);
g('credit-card-contrib', 10, 0, 100, 70, 1);
g('support-commission', 10, 0, 50, 5, 1);

g('social-security', 10, 0, 30, 8, 1);
g('cpf', 10, 0, 20, 4, 1);

g('office-material-cost-per-person', 10, 0, 200, 50, 10);

g('percent-for-teaching', 10, 0, 100, 80, 1);
g('percent-for-office', 10, 0, 100, 20, 1);

g('market-cost-percent', 10, 0, 30, 7, 1);

g('start-fund-in-10k', 10, 0, 100, 62, 1);

g('rent-deposite-in-k', 10, 0, 50, 0, 1);
g('initial-fee-in-10k', 10, 0, 100, 12, 1);

g('tutoring-cost-first-year', 10, 0, 2000, 0, 100);
g('tutoring-cost-second-year', 10, 0, 2000, 0, 100);
g('water-elec-cost-first-year', 10, 0, 1000, 0, 10);
g('water-elec-cost-second-year', 10, 0, 1000, 0, 10);

g('other-income-first-year', 5, 0, 100000, 0, 1000);
g('other-income-second-year', 5, 0, 100000, 0, 1000);
g('other-cost-first-year', 5, 0, 100000, 0, 1000);
g('other-cost-second-year', 5, 0, 100000, 0, 1000);
r();


/*------------------------------------------------------------------------*/

function gr() {
  d3.select('.cashflow>svg').remove();
  var data = [];

  data.push({name: 2016, value: w('first-year-reminder')});
  data.push({name: 2017, value: w('second-year-reminder')});
  data.push({name: 2018, value: 0});
  data.push({name: 2019, value: 0});
  data.push({name: 2020, value: 0});

  var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 370 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  var xx = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  var yy = d3.scaleLinear()
    .range([height, 0]);

  var xAxis = d3.axisBottom()
    .scale(xx)
    .tickSize(0)
    .tickPadding(10);

  var yAxis = d3.axisLeft()
    .scale(yy);

  var svg = d3.select(".cashflow").append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  yy.domain(d3.extent(data.concat({value:0}), function(d) { return d.value; })).nice();
  xx.domain(data.map(function(d) { return d.name; }));

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
    .attr("x", function(d) { return xx(d.name); })
    .attr("y", function(d) { return yy(Math.max(0, d.value)); })
    .attr("width", function(d) { return xx.bandwidth(); })
    .attr("height", function(d) { return Math.abs(yy(d.value) - yy(0));});

  svg.append("g")
    .attr("class", "axis")
    .selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", function(d) { return xx(d.name); })
    .attr("y", function(d) { return yy(d.value) - 7 * (d.value >= 0 ? 1 : -1); })
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });


  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yy(0) + ")")
    .call(xAxis);

  function type(d) {
    d.value = +d.value;
    return d;
  }
}

function gs() {
  d3.select('.netincome>svg').remove();
  var data = [];

  var i;
  for (i = 1; i <= 5; ++i) {
    data.push({name: 2015 + i, value: x(i, "after-tax-profit")});
  }

  var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 370 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  var xx = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  var yy = d3.scaleLinear()
    .range([height, 0]);

  var xAxis = d3.axisBottom()
    .scale(xx)
    .tickSize(0)
    .tickPadding(10);

  var yAxis = d3.axisLeft()
    .scale(yy);

  var svg = d3.select(".netincome").append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  yy.domain(d3.extent(data.concat({value:0}), function(d) { return d.value; })).nice();
  xx.domain(data.map(function(d) { return d.name; }));

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
    .attr("x", function(d) { return xx(d.name); })
    .attr("y", function(d) { return yy(Math.max(0, d.value)); })
    .attr("width", function(d) { return xx.bandwidth(); })
    .attr("height", function(d) { return Math.abs(yy(d.value) - yy(0));});

  svg.append("g")
    .attr("class", "axis")
    .selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", function(d) { return xx(d.name); })
    .attr("y", function(d) { return yy(d.value) - 7 * (d.value >= 0 ? 1 : -1); })
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });


  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yy(0) + ")")
    .call(xAxis);

  function type(d) {
    d.value = +d.value;
    return d;
  }
}
