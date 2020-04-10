const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
//Challenge 1
function estimateCurrentInfections(data,impact){
    return impact? data.reportedCases * 10: data.reportedCases * 50
}
function estimateProjectedInfections(data,impact){
    let factor;
    let currentlyInfected = impact? data.reportedCases * 10: data.reportedCases * 50;
    let {periodType,timeToElapse} =  data;
    switch(periodType){
        case 'days':
            factor = Math.floor(timeToElapse/3);
            break;
        case 'weeks':
            factor = Math.floor((timeToElapse * 7)/3);
            break;
        case 'months':
            factor = Math.floor((timeToElapse * 30)/3);;
        default:
            factor = Math.floor(timeToElapse/3);
    }
    
    return currentlyInfected * Math.pow(2,factor)
}
//Challenge 2
function estimateSevereCases(data,impact){
    var projectedInfections = impact? estimateProjectedInfections(data,impact): estimateProjectedInfections(data);
    return Math.floor(projectedInfections * 0.15)
}

function estimateBedSpaceAvialability(data,impact){
    var severeCases = impact? estimateSevereCases(data,impact): estimateSevereCases(data);
    var avialableBeds = Math.floor(data.totalHospitalBeds * 0.35);
    return avialableBeds - severeCases;
}
//Challenge 3
function estimateCasesForICU(data,impact){
    var projectedInfections = impact? estimateProjectedInfections(data,impact): estimateProjectedInfections(data);
    return Math.floor(0.05 * projectedInfections);
}
function estimateCasesForVentilators(data,impact){
    var projectedInfections = impact? estimateProjectedInfections(data,impact): estimateProjectedInfections(data);
    return Math.floor(0.02 * projectedInfections);
}
function estimateDollarsInFlight(data,impact){
    var projectedInfections = impact? estimateProjectedInfections(data,impact): estimateProjectedInfections(data);
    var {periodType,timeToElapse} =  data;
    var {avgDailyIncomeInUSD,avgDailyIncomePopulation} = data.region;
    var days;
    switch(periodType){
        case 'days':
            days = timeToElapse;
            break;
        case 'weeks':
            days = timeToElapse * 7;
            break;
        case 'months':
            days = timeToElapse * 30;
        default:
            days = timeToElapse;
    }
    return (projectedInfections * avgDailyIncomeInUSD * avgDailyIncomePopulation * days);
}

export {
    estimateCurrentInfections,
    estimateProjectedInfections,
    estimateSevereCases,
    estimateBedSpaceAvialability,
    estimateCasesForICU,
    estimateCasesForVentilators,
    estimateDollarsInFlight
};