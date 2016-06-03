function r() {
  var metas = document.getElementsByTagName(/* @mangle */'meta'/* @/mangle */);
  for (var i=0; i<metas.length; i++) {
    if (metas[i].getAttribute(/* @mangle */"name"/* @/mangle */) === /* @mangle */"author"/* @/mangle */) {
      if (metas[i].getAttribute(/* @mangle */"content"/* @/mangle */).indexOf(/* @mangle */'1e0n'/* @/mangle */) === 0) {
        for (var key in s) {
          if (s.hasOwnProperty(key)) {
            var v = s[key].value();
            v = Math.round(v * 100) / 100;
            d3.select(/* @mangle */'.'/* @/mangle */ + key + /* @mangle */' .text'/* @/mangle */).text(v);
          }
        }
        t(); u(); b();
      }
      break;
    }
  }
}

var s = {};

function g(name, ticks, min, max, value, step) {
  s[name] = d3.slider();
  if (Object.prototype.toString.call(ticks) === '[object Array]') {
    s[name].axis(d3.svg.axis().tickValues(ticks));
  }
  else {
    s[name].axis(d3.svg.axis().ticks(ticks));
  }
  s[name].min(min).max(max).value(value).step(step)
    .on("slide", function(evt, value) {
      if (name == /* @mangle */'percent-for-teaching'/* @/mangle */) {
        s[/* @mangle */'percent-for-office'/* @/mangle */].value(100 - value);
      }
      if (name == /* @mangle */'percent-for-office'/* @/mangle */) {
        s[/* @mangle */'percent-for-teaching'/* @/mangle */].value(100 - value);
      }
      var metas = document.getElementsByTagName(/* @mangle */'meta'/* @/mangle */);
      var meta = '';
      for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute(/* @mangle */"name"/* @/mangle */) === /* @mangle */"author"/* @/mangle */) {
          if (metas[i].getAttribute(/* @mangle */"content"/* @/mangle */).indexOf(/* @mangle */'1e0n'/* @/mangle */) >= 0 && d3.select(/* @mangle */'.footer'/* @/mangle */).text().indexOf(/* @mangle */'Mala'/* @/mangle */) > 30) {
            r();
          }
        }
      }
    });
  d3.select(/* @mangle */'.'/* @/mangle */ + name + /* @mangle */' .graph'/* @/mangle */).call(s[name]);
}
function o(k, v) {
  v = Math.round(v * 100) / 100;
  d3.selectAll(/* @mangle */'.'/* @/mangle */ + k + /* @mangle */'.text'/* @/mangle */).text(v);
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
  d3.selectAll(/* @mangle */'.'/* @/mangle */ + k + /* @mangle */'-yearly td.text:nth-child('/* @/mangle */ + (y+1) + /* @mangle */')'/* @/mangle */).text(v);
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


g(/* @mangle */'area'/* @/mangle */, 10, 200, 2000, 300, 50);
g(/* @mangle */'rent-per-square'/* @/mangle */, 7, 0, 300, 40, 1);
g(/* @mangle */'rent-months'/* @/mangle */, 10, 0, 120, 36, 6);
g(/* @mangle */'property-cost-per-square'/* @/mangle */, 11, 0, 20, 2, 1);
g(/* @mangle */'op-month-first-year'/* @/mangle */, 13, 0, 12, 6, 1);
g(/* @mangle */'rent-month-first-year'/* @/mangle */, 13, 0, 12, 6, 1);
g(/* @mangle */'op-month-second-year'/* @/mangle */, 13, 0, 12, 12, 1);
g(/* @mangle */'rent-month-second-year'/* @/mangle */, 13, 0, 12, 12, 1);

g(/* @mangle */'classrooms'/* @/mangle */, 13, 0, 100, 18, 1);
g(/* @mangle */'decoration-cost-per-square'/* @/mangle */, 11, 0, 2000, 700, 10);
g(/* @mangle */'hr-first-year'/* @/mangle */, 11, 0, 100, 10, 1);
g(/* @mangle */'hr-second-year'/* @/mangle */, 11, 0, 100, 10, 1);
g(/* @mangle */'salary'/* @/mangle */, 11, 1000, 5000, 2000, 100);
g(/* @mangle */'desks'/* @/mangle */, 11, 0, 200, 30, 1);
g(/* @mangle */'desk-price'/* @/mangle */, 10, 100, 1000, 500, 10);
g(/* @mangle */'device-price'/* @/mangle */, 10, 500, 5000, 3000, 100);

g(/* @mangle */'p2p-student-first-year'/* @/mangle */, 10, 0, 500, 80, 10);
g(/* @mangle */'p2p-student-second-year'/* @/mangle */, 10, 0, 500, 150, 10);
g(/* @mangle */'p2p-avg-charge'/* @/mangle */, 9, 0, 16000, 8000, 1000);
g(/* @mangle */'p2p-avg-complete-rate'/* @/mangle */, 10, 0, 100, 80, 5);

g(/* @mangle */'sm-student-first-year'/* @/mangle */, 10, 0, 500, 60, 10);
g(/* @mangle */'sm-student-second-year'/* @/mangle */, 10, 0, 500, 140, 10);
g(/* @mangle */'sm-avg-charge'/* @/mangle */, 5, 0, 4000, 2000, 100);
g(/* @mangle */'sm-avg-complete-rate'/* @/mangle */, 10, 0, 100, 95, 5);

g(/* @mangle */'bg-student-first-year'/* @/mangle */, 10, 0, 500, 100, 10);
g(/* @mangle */'bg-student-second-year'/* @/mangle */, 10, 0, 500, 160, 10);
g(/* @mangle */'bg-avg-charge'/* @/mangle */, 9, 0, 1600, 800, 100);
g(/* @mangle */'bg-avg-complete-rate'/* @/mangle */, 10, 0, 100, 95, 5);

g(/* @mangle */'sales-commission'/* @/mangle */, 10, 0, 50, 5, 1);
g(/* @mangle */'course-material-cost'/* @/mangle */, 10, 0, 100, 20, 5);

g(/* @mangle */'pay-teacher-percent-for-p2p'/* @/mangle */, 10, 0, 100, 40, 1);
g(/* @mangle */'pay-teacher-percent-for-class'/* @/mangle */, 10, 0, 100, 30, 1);

g(/* @mangle */'vat'/* @/mangle */, d3.range(0, 9, 3), 0, 6, 3, 3);
g(/* @mangle */'local-tax'/* @/mangle */, 10, 0, 30, 12, 1);

g(/* @mangle */'credit-card-fee-percent'/* @/mangle */, 10, 0, 3, 0.78, 0.01);
g(/* @mangle */'credit-card-contrib'/* @/mangle */, 10, 0, 100, 70, 1);
g(/* @mangle */'support-commission'/* @/mangle */, 10, 0, 50, 5, 1);

g(/* @mangle */'social-security'/* @/mangle */, 10, 0, 30, 8, 1);
g(/* @mangle */'cpf'/* @/mangle */, 10, 0, 20, 4, 1);

g(/* @mangle */'office-material-cost-per-person'/* @/mangle */, 10, 0, 200, 50, 10);

g(/* @mangle */'percent-for-teaching'/* @/mangle */, 10, 0, 100, 80, 1);
g(/* @mangle */'percent-for-office'/* @/mangle */, 10, 0, 100, 20, 1);

g(/* @mangle */'market-cost-percent'/* @/mangle */, 10, 0, 30, 7, 1);

g(/* @mangle */'start-fund-in-10k'/* @/mangle */, 10, 0, 100, 62, 1);

g(/* @mangle */'rent-deposite-in-k'/* @/mangle */, 10, 0, 50, 0, 1);
g(/* @mangle */'initial-fee-in-10k'/* @/mangle */, 10, 0, 100, 12, 1);

g(/* @mangle */'tutoring-cost-first-year'/* @/mangle */, 10, 0, 2000, 0, 100);
g(/* @mangle */'tutoring-cost-second-year'/* @/mangle */, 10, 0, 2000, 0, 100);
g(/* @mangle */'water-elec-cost-first-year'/* @/mangle */, 10, 0, 1000, 0, 10);
g(/* @mangle */'water-elec-cost-second-year'/* @/mangle */, 10, 0, 1000, 0, 10);

g(/* @mangle */'other-income-first-year'/* @/mangle */, 5, 0, 100000, 0, 1000);
g(/* @mangle */'other-income-second-year'/* @/mangle */, 5, 0, 100000, 0, 1000);
g(/* @mangle */'other-cost-first-year'/* @/mangle */, 5, 0, 100000, 0, 1000);
g(/* @mangle */'other-cost-second-year'/* @/mangle */, 5, 0, 100000, 0, 1000);
r();
