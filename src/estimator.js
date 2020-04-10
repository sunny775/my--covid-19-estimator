import {
  estimateCurrentInfections,
  estimateProjectedInfections,
  estimateSevereCases,
  estimateBedSpaceAvialability,
  estimateCasesForICU,
  estimateCasesForVentilators,
  estimateDollarsInFlight
} from './helpers';

const covid19ImpactEstimator = (data) => {
  let impact = 'impact';

  return {
    data: data,
    impact: {
      currentlyInfected: estimateCurrentInfections(data, impact),
      infectionsByRequestedTime: estimateProjectedInfections(data, impact),
      severeCasesByRequestedTime: estimateSevereCases(data, impact),
      hospitalBedsByRequestedTime: estimateBedSpaceAvialability(data, impact),
      casesForICUByRequestedTime: estimateCasesForICU(data, impact),
      casesForVentilatorsByRequestedTime: estimateCasesForVentilators(
        data,
        impact
      ),
      dollarsInFlight: estimateDollarsInFlight(data, impact)
    },
    severeImpact: {
      currentlyInfected: estimateCurrentInfections(data),
      infectionsByRequestedTime: estimateProjectedInfections(data),
      severeCasesByRequestedTime: estimateSevereCases(data),
      hospitalBedsByRequestedTime: estimateBedSpaceAvialability(data),
      casesForICUByRequestedTime: estimateCasesForICU(data),
      casesForVentilatorsByRequestedTime: estimateCasesForVentilators(data),
      dollarsInFlight: estimateDollarsInFlight(data)
    }
  };
};

export default covid19ImpactEstimator;
