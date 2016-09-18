function clickUserElement(proj, portfolio_name){
  console.log(proj);
  var kind = '';
  $('#card_linechart').css('display','none');
  $('#card-iogt').css('display','none');
  $('#card-github').css('display','none');
  $('#project_link').css('display', 'none');
  var country = proj.country.replace(/\s+/g, "").toLowerCase()
  //Get the bound item from the DOM element clicked

  if(proj.slug.match(/u_report/)){
    kind = 'ureport';
    color = 'rgba(255, 204, 51, 0.2)';
  }else if(proj.slug.match(/iogt/)){
    kind = 'iogt';
    color = 'rgba(133, 214, 133, 0.2)';
  } else{
    kind = 'github';
    color = 'rgba(255, 143, 171, 0.2)';
  }

  document.getElementById('portfolio_project_kind').innerHTML = kind;
  document.getElementById('portfolio_project_color').innerHTML = color;
  document.getElementById('portfolio_project_country').innerHTML = proj.country;
  document.getElementById('portfolio_project_name').innerHTML = proj.name;
  document.getElementById('portfolio_project_amount').innerHTML = '$' + proj.amount;
  document.getElementById('portfolio_project_description').innerHTML = proj.description;

  if(proj.link_href){
    $('#project_link').attr('href', proj.link_href);
    $('#project_link').text(proj.link_text);
    $('#project_link').css('display', 'block');
  }
  // $('#portfolio_project_image').attr('src', data.image);

  // DOM elements located in main-app.html
  if(proj.slug.match(/u_report/i)){
    $('#card_linechart').css('display','block');
    $('#fire_for_modal').attr('path', 'ureport/' + country);
  }else if(proj.slug.match(/iogt/i)){
    $('#card-iogt').css('display','block');
    $('#fire_for_modal').attr('path', 'iogt');
    $('#geo_for_modal').attr('path', 'iogt_all/newUsers')
  }else if(proj.github){
    $('#card_linechart').css('display','block');
    // $('#fire_for_git_commits').attr(
    $('#fire_for_modal').attr(
      'path',
      '/git/' +
      proj.slug
    )
  }

  $('#modal-top').removeClass();
  $('#modal-top').addClass("modal_top_" + portfolio_name);

  document.getElementById('modal_ureport').click();
  // alert(JSON.stringify(data))
}

function cleanToMil(num) {
  if(num >= 1000000){
    num =  Math.max( Math.round((num/1000000) * 10) / 10, 0 ).toFixed(1);
    num =  num  % 1 === 0 ? parseInt(num) : num;
    return "$" + num + "M";
  }else{
    num = Math.round((num/1000))    // num =  Math.max( Math.round((num/100000) * 10) / 10, 0 ).toFixed(0);
    num = num  % 1 === 0 ? parseInt(num) : num;
    return "$" + num + "K";
  }
}

function prepareUreport(dataSet, featured, color){

    months = {}
    // Create months hash
    Object.keys(dataSet).forEach(function(country){
      dataSet[country].forEach(function(elem){
        months[elem[0]] = 0;
      })
    })

    // Assign count to each month
    Object.keys(dataSet).forEach(function(country){
      dataSet[country].forEach(function(elem){
        months[elem[0]] += elem[1];
      })
    })
    var labels = Object.keys(months);
    var points = Object.keys(months).map(function(k){return months[k]});
    points.map(function(e, i){
      if(i > 0){
        points[i] += points[i-1]
      }
    })
    labels = humanize_labels(labels)
    return {
      labels: labels,
      datasets:[
        {
          label: featured,
          backgroundColor: color,
          borderColor:"rgba(255,255,255)",
          pointBackgroundColor:"rgba(2255,255,255)",
          pointBorderColor:"#fff",
          pointHoverBackgroundColor:"#fff",
          pointHoverBorderColor:"rgba(220,220,220,1)",
          data:points
        }
      ]
    }
     // return [ [ "Month", "countries" ], [ "2015-07", 61054 ], [ "2015-08", 477420 ], [ "2015-09", 91082 ], [ "2015-10", 32660 ], [ "2015-11", 94476 ], [ "2015-12", 23081 ], [ "2016-01", 33204 ] ]
}

function prepare(svg, featured, dataSet){
  if(Object.keys(dataSet) == 0){return;}
  // var color = ''
  // if(svg == 'youth_engagement') {
  //   color = "rgba(255, 204, 51, 0.2)";
  // }else if(svg == 'real_time_information') {
  //   color = "rgba(255, 143, 171, 0.2)";
  // }else{
  //   color = "rgba(133, 214, 133, 0.2)";
  // }

  if (svg == 'youth_engagement'){
    return prepareUreport(dataSet, featured, "rgba(255, 204, 51, 0.2)")
  }else if(svg == 'real_time_information'){
    return prepareGitCommits(dataSet, featured, "rgba(255, 143, 171, 0.2)");
  }else{
    return prepareIOGT(dataSet, featured, "rgba(133, 214, 133, 0.2)")
  }
}

function data_for_linechart(label, labels, points, color){
  return {
  labels: labels,
  datasets: [
      {
        label: label,
        backgroundColor: color,
        borderColor: "rgba(2255,255,255)",
        borderWidth: 1,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(2255,255,255)",
        data: points
      }
    ]
  }
}

function drawPieChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('zzzz'));
  chart.draw(data, options);
}


// kind is ureport or iogt
function drawChart(ary, country, kind) {
  var data = google.visualization.arrayToDataTable(ary);
  var width = kind.match(/(ureport|github)/) ? 1200 : 600;
  var options = {
    title: country,
    curveType: 'none',
    width: width,
    height:230,
    hAxis: {title: '' , direction:-1, slantedText:true, slantedTextAngle:10 },
    legend: { position: 'top' },
  };
  var chart = new google.visualization.LineChart(document.getElementById(kind + '_curve_chart'));
  chart.draw(data, options);
}

function drawGeoChart(data) {
  var options = {
    width: Math.min($('#iogt_geo_chart').width(), 900),
    height: 230,
    enableRegionInteractivity: "true",
    colorAxis: {colors: [ "#ffff00", "#fffd01", "#fffb03", "#fff905", "#fff806", "#fff608", "#fff40a", "#fff10d", "#ffef0f", "#ffee11", "#ffec12", "#ffea14", "#ffe816", "#ffe519", "#ffe31b", "#ffe21c", "#ffe01e", "#ffde20", "#ffdd22", "#ffdb23", "#ffd727", "#ffd628", "#ffd42a", "#ffd22c", "#ffd12d", "#ffcf2f", "#ffcc33",    "#ffca31", "#ffc82f", "#ffc62d", "#ffc52c", "#ffc32a", "#ffc128", "#ffbe25", "#ffbc23", "#ffbb22", "#ffb920", "#ffb71e", "#ffb51c", "#ffb219", "#ffb017", "#ffaf16", "#ffad14", "#ffab12", "#ffaa11", "#ffa80f", "#ffa40b", "#ffa30a", "#ffa108", "#ff9f06", "#ff9e05", "#ff9c03", "#ff9900", "#ff9503", "#ff9206", "#ff8e0a", "#ff8b0d", "#ff8811", "#ff8414", "#ff7d1b", "#ff7a1e", "#ff7722", "#ff7325", "#ff7028", "#ff6c2c", "#ff6633", "#ff6236", "#ff5f39", "#ff5b3d", "#ff5840", "#ff5544", "#ff5147", "#ff4a4e", "#ff4751", "#ff4455", "#ff4058", "#ff3d5b", "#ff395f", "#ff3366",   "#f83367", "#f13369", "#ea336b", "#e3336c", "#dd336e", "#d63370", "#c83373", "#c13375", "#bb3377", "#b43378", "#ad337a", "#a6337c", "#99337f", "#923381", "#8b3382", "#843384", "#7d3386", "#773388", "#703389", "#62338d", "#5b338e", "#553390", "#4e3392", "#473393", "#403395", "#333399"]},
    backgroundColor: "#FFF",
    datalessRegionColor: "#FFF",
    defaultColor: "#f5f5f5"
  };

  var ary = google.visualization.arrayToDataTable(
    data
  );


  var chart = new google.visualization.GeoChart(document.getElementById('iogt_geo_chart'));

  chart.draw(ary, options);
}

function humanize_label(label){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  month = parseInt(label.split(/-/)[1]);
  human_month = months[month-1];
  year_contraction = label.substr(2,2);
  return human_month + " '" + year_contraction;
}


function humanize_labels(ary){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return ary.map(function(e){
    return humanize_label(e);
  })
}

function gitPointsAndLabels(dataSet){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  var humanized_months = [];
  var months = months.reduce(
    function(hash, elem, index){
      hash[index++] = elem;
      return hash
      }, {})

  commit_months = {};
  account = Object.keys(dataSet)[0];
  repo = Object.keys(dataSet[account])[0]
  commits = dataSet[account][repo].commits
  commits.forEach(function(commit){
    var date = new Date(commit.week*1000)
    var month = date.getMonth();
    var year = date.getFullYear()-2000;

    week_sum = commit.days.reduce(function(total, day){
      return total + day
    }, 0)
    var label = months[month] + " '" +  year;
    humanized_months.push(label);
    if (commit_months[label]){
      commit_months[label] += week_sum;
    }else{
      commit_months[label] = week_sum;
    }
  })

  var labels = humanized_months.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var points = labels.map(function(l){
    return commit_months[l];
  })

  return {points: points, labels: labels}
}

function cleanToMil(num) {
  if(num >= 1000000){
    num =  Math.max( Math.round((num/1000000) * 10) / 10, 0 ).toFixed(1);
    num =  num  % 1 === 0 ? parseInt(num) : num;
    return "$" + num + "M";
  }else{

    num = Math.round((num/1000))    // num =  Math.max( Math.round((num/100000) * 10) / 10, 0 ).toFixed(0);
    num = num  % 1 === 0 ? parseInt(num) : num;
    return "$" + num + "K";
  }
}


function formalize(term) {
  return term.replace(/_/g, ' ');
}

function trim(str) {
  return str.substr(0,7);
}

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}

function clickHandler(e) {
  var button = e.target;
  while (!button.hasAttribute('data-dialog') && button !== document.body) {
    button = button.parentElement;
  }
  if (!button.hasAttribute('data-dialog')) {
    return;
  }
  var id = button.getAttribute('data-dialog');
  var dialog = document.getElementById(id);
  if (dialog) {
    dialog.open();
  }
}
