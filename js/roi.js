// Strategic Alliance Builder - ROI Calculator Module

/**
 * ROICalculator - Handles ROI calculations for strategic partnerships
 */
const ROICalculator = (function() {
    /**
     * Calculate financial ROI for a partnership
     * @param {Object} investment - Investment details (costs, resources, time)
     * @param {Object} returns - Expected returns (revenue, cost savings)
     * @param {number} timeframeMonths - Timeframe in months
     * @returns {Object} ROI metrics
     */
    function calculateFinancialROI(investment, returns, timeframeMonths = 12) {
        // Validate inputs
        if (!investment || !returns || timeframeMonths <= 0) {
            console.error('Invalid inputs for ROI calculation');
            return null;
        }
        
        // Calculate total investment
        const totalInvestment = calculateTotalInvestment(investment);
        
        // Calculate total returns
        const totalReturns = calculateTotalReturns(returns, timeframeMonths);
        
        // Calculate ROI metrics
        const netReturn = totalReturns - totalInvestment;
        const roiPercentage = totalInvestment > 0 ? (netReturn / totalInvestment) * 100 : 0;
        const paybackMonths = totalReturns > 0 ? (totalInvestment / (totalReturns / timeframeMonths)) : Infinity;
        
        return {
            totalInvestment,
            totalReturns,
            netReturn,
            roiPercentage,
            paybackMonths,
            timeframeMonths
        };
    }
    
    /**
     * Calculate total investment
     * @param {Object} investment - Investment details
     * @returns {number} Total investment amount
     */
    function calculateTotalInvestment(investment) {
        let total = 0;
        
        // Direct costs
        if (investment.directCosts) {
            total += parseFloat(investment.directCosts) || 0;
        }
        
        // Staff costs
        if (investment.staffHours && investment.hourlyRate) {
            const staffHours = parseFloat(investment.staffHours) || 0;
            const hourlyRate = parseFloat(investment.hourlyRate) || 0;
            total += staffHours * hourlyRate;
        }
        
        // Resource allocation
        if (investment.resourceAllocation) {
            total += parseFloat(investment.resourceAllocation) || 0;
        }
        
        // Marketing costs
        if (investment.marketingCosts) {
            total += parseFloat(investment.marketingCosts) || 0;
        }
        
        // Technology costs
        if (investment.technologyCosts) {
            total += parseFloat(investment.technologyCosts) || 0;
        }
        
        // Other costs
        if (investment.otherCosts) {
            total += parseFloat(investment.otherCosts) || 0;
        }
        
        return total;
    }
    
    /**
     * Calculate total returns
     * @param {Object} returns - Expected returns
     * @param {number} timeframeMonths - Timeframe in months
     * @returns {number} Total returns amount
     */
    function calculateTotalReturns(returns, timeframeMonths) {
        let total = 0;
        
        // Direct revenue
        if (returns.directRevenue) {
            const monthlyRevenue = parseFloat(returns.directRevenue) || 0;
            total += monthlyRevenue * timeframeMonths;
        }
        
        // Cost savings
        if (returns.costSavings) {
            const monthlySavings = parseFloat(returns.costSavings) || 0;
            total += monthlySavings * timeframeMonths;
        }
        
        // Customer acquisition value
        if (returns.newCustomers && returns.customerLTV) {
            const newCustomers = parseFloat(returns.newCustomers) || 0;
            const customerLTV = parseFloat(returns.customerLTV) || 0;
            total += newCustomers * customerLTV;
        }
        
        // Market share value
        if (returns.marketShareIncrease && returns.marketShareValue) {
            const marketShareIncrease = parseFloat(returns.marketShareIncrease) || 0;
            const marketShareValue = parseFloat(returns.marketShareValue) || 0;
            total += marketShareIncrease * marketShareValue;
        }
        
        // Other returns
        if (returns.otherReturns) {
            total += parseFloat(returns.otherReturns) || 0;
        }
        
        return total;
    }
    
    /**
     * Calculate strategic value score
     * @param {Object} partnership - Partnership details
     * @returns {Object} Strategic value metrics
     */
    function calculateStrategicValue(partnership) {
        // Validate input
        if (!partnership) {
            console.error('Invalid partnership data for strategic value calculation');
            return null;
        }
        
        // Calculate dimension scores
        const audienceScore = calculateAudienceScore(partnership);
        const brandScore = calculateBrandScore(partnership);
        const innovationScore = calculateInnovationScore(partnership);
        const marketAccessScore = calculateMarketAccessScore(partnership);
        const relationshipScore = calculateRelationshipScore(partnership);
        
        // Calculate overall strategic value score (0-100)
        const overallScore = Math.round(
            (audienceScore + brandScore + innovationScore + marketAccessScore + relationshipScore) / 5
        );
        
        return {
            overallScore,
            dimensionScores: {
                audience: audienceScore,
                brand: brandScore,
                innovation: innovationScore,
                marketAccess: marketAccessScore,
                relationship: relationshipScore
            }
        };
    }
    
    /**
     * Calculate audience expansion score
     * @param {Object} partnership - Partnership details
     * @returns {number} Score (0-100)
     */
    function calculateAudienceScore(partnership) {
        let score = 0;
        
        // New audience reach
        if (partnership.audienceReach) {
            const reach = parseFloat(partnership.audienceReach) || 0;
            // Score based on reach percentage (0-30%)
            score += Math.min(30, reach) * 2; // Max 60 points
        }
        
        // Audience overlap
        if (partnership.audienceOverlap !== undefined) {
            const overlap = parseFloat(partnership.audienceOverlap) || 0;
            // Less overlap is better (0-100%)
            score += (100 - overlap) * 0.2; // Max 20 points
        }
        
        // Audience engagement potential
        if (partnership.audienceEngagement) {
            const engagement = parseFloat(partnership.audienceEngagement) || 0;
            // Score based on engagement level (0-5)
            score += engagement * 4; // Max 20 points
        }
        
        return Math.min(100, Math.round(score));
    }
    
    /**
     * Calculate brand enhancement score
     * @param {Object} partnership - Partnership details
     * @returns {number} Score (0-100)
     */
    function calculateBrandScore(partnership) {
        let score = 0;
        
        // Brand alignment
        if (partnership.brandAlignment) {
            const alignment = parseFloat(partnership.brandAlignment) || 0;
            // Score based on alignment level (0-5)
            score += alignment * 10; // Max 50 points
        }
        
        // Reputation enhancement
        if (partnership.reputationEnhancement) {
            const enhancement = parseFloat(partnership.reputationEnhancement) || 0;
            // Score based on enhancement level (0-5)
            score += enhancement * 6; // Max 30 points
        }
        
        // Brand visibility increase
        if (partnership.brandVisibility) {
            const visibility = parseFloat(partnership.brandVisibility) || 0;
            // Score based on visibility increase (0-100%)
            score += visibility * 0.2; // Max 20 points
        }
        
        return Math.min(100, Math.round(score));
    }
    
    /**
     * Calculate innovation potential score
     * @param {Object} partnership - Partnership details
     * @returns {number} Score (0-100)
     */
    function calculateInnovationScore(partnership) {
        let score = 0;
        
        // Innovation potential
        if (partnership.innovationPotential) {
            const potential = parseFloat(partnership.innovationPotential) || 0;
            // Score based on potential level (0-5)
            score += potential * 10; // Max 50 points
        }
        
        // Technology access
        if (partnership.technologyAccess) {
            const access = parseFloat(partnership.technologyAccess) || 0;
            // Score based on access level (0-5)
            score += access * 6; // Max 30 points
        }
        
        // Intellectual property creation
        if (partnership.ipCreation) {
            const creation = parseFloat(partnership.ipCreation) || 0;
            // Score based on IP creation potential (0-5)
            score += creation * 4; // Max 20 points
        }
        
        return Math.min(100, Math.round(score));
    }
    
    /**
     * Calculate market access score
     * @param {Object} partnership - Partnership details
     * @returns {number} Score (0-100)
     */
    function calculateMarketAccessScore(partnership) {
        let score = 0;
        
        // New market access
        if (partnership.newMarketAccess) {
            const access = parseFloat(partnership.newMarketAccess) || 0;
            // Score based on access level (0-5)
            score += access * 10; // Max 50 points
        }
        
        // Distribution channel expansion
        if (partnership.channelExpansion) {
            const expansion = parseFloat(partnership.channelExpansion) || 0;
            // Score based on expansion level (0-5)
            score += expansion * 6; // Max 30 points
        }
        
        // Competitive advantage
        if (partnership.competitiveAdvantage) {
            const advantage = parseFloat(partnership.competitiveAdvantage) || 0;
            // Score based on advantage level (0-5)
            score += advantage * 4; // Max 20 points
        }
        
        return Math.min(100, Math.round(score));
    }
    
    /**
     * Calculate relationship value score
     * @param {Object} partnership - Partnership details
     * @returns {number} Score (0-100)
     */
    function calculateRelationshipScore(partnership) {
        let score = 0;
        
        // Strategic alignment
        if (partnership.strategicAlignment) {
            const alignment = parseFloat(partnership.strategicAlignment) || 0;
            // Score based on alignment level (0-5)
            score += alignment * 10; // Max 50 points
        }
        
        // Long-term potential
        if (partnership.longTermPotential) {
            const potential = parseFloat(partnership.longTermPotential) || 0;
            // Score based on potential level (0-5)
            score += potential * 8; // Max 40 points
        }
        
        // Ecosystem integration
        if (partnership.ecosystemIntegration) {
            const integration = parseFloat(partnership.ecosystemIntegration) || 0;
            // Score based on integration level (0-5)
            score += integration * 2; // Max 10 points
        }
        
        return Math.min(100, Math.round(score));
    }
    
    /**
     * Calculate risk assessment
     * @param {Object} partnership - Partnership details
     * @returns {Object} Risk assessment metrics
     */
    function calculateRiskAssessment(partnership) {
        // Validate input
        if (!partnership) {
            console.error('Invalid partnership data for risk assessment');
            return null;
        }
        
        // Calculate risk scores (higher score = higher risk)
        const financialRisk = calculateFinancialRisk(partnership);
        const reputationRisk = calculateReputationRisk(partnership);
        const operationalRisk = calculateOperationalRisk(partnership);
        const strategicRisk = calculateStrategicRisk(partnership);
        
        // Calculate overall risk score (0-100)
        const overallRisk = Math.round(
            (financialRisk + reputationRisk + operationalRisk + strategicRisk) / 4
        );
        
        // Determine risk level
        let riskLevel;
        if (overallRisk < 25) {
            riskLevel = 'Low';
        } else if (overallRisk < 50) {
            riskLevel = 'Moderate';
        } else if (overallRisk < 75) {
            riskLevel = 'High';
        } else {
            riskLevel = 'Critical';
        }
        
        // Generate risk mitigation recommendations
        const recommendations = generateRiskMitigationRecommendations({
            financialRisk,
            reputationRisk,
            operationalRisk,
            strategicRisk
        });
        
        return {
            overallRisk,
            riskLevel,
            riskScores: {
                financial: financialRisk,
                reputation: reputationRisk,
                operational: operationalRisk,
                strategic: strategicRisk
            },
            recommendations
        };
    }
    
    /**
     * Calculate financial risk score
     * @param {Object} partnership - Partnership details
     * @returns {number} Risk score (0-100)
     */
    function calculateFinancialRisk(partnership) {
        let riskScore = 0;
        
        // Investment size risk
        if (partnership.investmentSize) {
            const size = parseFloat(partnership.investmentSize) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += size * 10; // Max 50 points
        }
        
        // Revenue uncertainty
        if (partnership.revenueUncertainty) {
            const uncertainty = parseFloat(partnership.revenueUncertainty) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += uncertainty * 6; // Max 30 points
        }
        
        // Cost overrun probability
        if (partnership.costOverrunRisk) {
            const overrunRisk = parseFloat(partnership.costOverrunRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += overrunRisk * 4; // Max 20 points
        }
        
        return Math.min(100, Math.round(riskScore));
    }
    
    /**
     * Calculate reputation risk score
     * @param {Object} partnership - Partnership details
     * @returns {number} Risk score (0-100)
     */
    function calculateReputationRisk(partnership) {
        let riskScore = 0;
        
        // Partner reputation risk
        if (partnership.partnerReputationRisk) {
            const repRisk = parseFloat(partnership.partnerReputationRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += repRisk * 12; // Max 60 points
        }
        
        // Brand alignment risk
        if (partnership.brandAlignmentRisk) {
            const alignmentRisk = parseFloat(partnership.brandAlignmentRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += alignmentRisk * 8; // Max 40 points
        }
        
        return Math.min(100, Math.round(riskScore));
    }
    
    /**
     * Calculate operational risk score
     * @param {Object} partnership - Partnership details
     * @returns {number} Risk score (0-100)
     */
    function calculateOperationalRisk(partnership) {
        let riskScore = 0;
        
        // Integration complexity
        if (partnership.integrationComplexity) {
            const complexity = parseFloat(partnership.integrationComplexity) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += complexity * 10; // Max 50 points
        }
        
        // Resource conflict risk
        if (partnership.resourceConflictRisk) {
            const conflictRisk = parseFloat(partnership.resourceConflictRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += conflictRisk * 6; // Max 30 points
        }
        
        // Timeline risk
        if (partnership.timelineRisk) {
            const timelineRisk = parseFloat(partnership.timelineRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += timelineRisk * 4; // Max 20 points
        }
        
        return Math.min(100, Math.round(riskScore));
    }
    
    /**
     * Calculate strategic risk score
     * @param {Object} partnership - Partnership details
     * @returns {number} Risk score (0-100)
     */
    function calculateStrategicRisk(partnership) {
        let riskScore = 0;
        
        // Goal misalignment risk
        if (partnership.goalMisalignmentRisk) {
            const misalignmentRisk = parseFloat(partnership.goalMisalignmentRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += misalignmentRisk * 10; // Max 50 points
        }
        
        // Dependency risk
        if (partnership.dependencyRisk) {
            const dependencyRisk = parseFloat(partnership.dependencyRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += dependencyRisk * 8; // Max 40 points
        }
        
        // Competitive disclosure risk
        if (partnership.competitiveDisclosureRisk) {
            const disclosureRisk = parseFloat(partnership.competitiveDisclosureRisk) || 0;
            // Scale from 1-5, higher is riskier
            riskScore += disclosureRisk * 2; // Max 10 points
        }
        
        return Math.min(100, Math.round(riskScore));
    }
    
    /**
     * Generate risk mitigation recommendations
     * @param {Object} riskScores - Risk scores for each category
     * @returns {Array} Risk mitigation recommendations
     */
    function generateRiskMitigationRecommendations(riskScores) {
        const recommendations = [];
        
        // Financial risk recommendations
        if (riskScores.financialRisk >= 60) {
            recommendations.push('Implement phased investment approach with clear go/no-go decision points.');
            recommendations.push('Establish detailed financial monitoring with regular review intervals.');
        } else if (riskScores.financialRisk >= 30) {
            recommendations.push('Set clear financial metrics and performance indicators.');
            recommendations.push('Include contingency funding in the partnership budget.');
        }
        
        // Reputation risk recommendations
        if (riskScores.reputationRisk >= 60) {
            recommendations.push('Conduct thorough reputation due diligence before finalizing the partnership.');
            recommendations.push('Create a comprehensive crisis communication plan.');
        } else if (riskScores.reputationRisk >= 30) {
            recommendations.push('Define brand usage guidelines for the partnership.');
            recommendations.push('Implement a media monitoring system for early risk detection.');
        }
        
        // Operational risk recommendations
        if (riskScores.operationalRisk >= 60) {
            recommendations.push('Appoint dedicated integration managers from both organizations.');
            recommendations.push('Develop detailed implementation roadmap with clear dependencies and critical path.');
        } else if (riskScores.operationalRisk >= 30) {
            recommendations.push('Establish a joint steering committee for operational oversight.');
            recommendations.push('Create clear escalation paths for operational issues.');
        }
        
        // Strategic risk recommendations
        if (riskScores.strategicRisk >= 60) {
            recommendations.push('Define a detailed exit strategy before partnership launch.');
            recommendations.push('Implement formal quarterly strategic alignment reviews.');
        } else if (riskScores.strategicRisk >= 30) {
            recommendations.push('Document shared strategic objectives with measurable outcomes.');
            recommendations.push('Define clear intellectual property rights and usage agreements.');
        }
        
        return recommendations;
    }
    
    /**
     * Calculate comprehensive partnership ROI
     * @param {Object} partnership - Partnership details including financial and strategic aspects
     * @returns {Object} Comprehensive ROI assessment
     */
    function calculatePartnershipROI(partnership) {
        // Validate input
        if (!partnership) {
            console.error('Invalid partnership data for ROI calculation');
            return null;
        }
        
        // Calculate financial ROI
        const financialROI = calculateFinancialROI(
            partnership.investment,
            partnership.returns,
            partnership.timeframeMonths || 12
        );
        
        // Calculate strategic value
        const strategicValue = calculateStrategicValue(partnership);
        
        // Calculate risk assessment
        const riskAssessment = calculateRiskAssessment(partnership);
        
        // Calculate overall partnership score (0-100)
        // Weight financial ROI (40%), strategic value (40%), and risk assessment (20%)
        let overallScore = 0;
        
        // Financial component (max 40 points)
        // ROI > 200% = 40 points, ROI > 100% = 30 points, ROI > 50% = 20 points, ROI > 0% = 10 points
        if (financialROI.roiPercentage > 200) {
            overallScore += 40;
        } else if (financialROI.roiPercentage > 100) {
            overallScore += 30;
        } else if (financialROI.roiPercentage > 50) {
            overallScore += 20;
        } else if (financialROI.roiPercentage > 0) {
            overallScore += 10;
        }
        
        // Strategic value component (max 40 points)
        overallScore += (strategicValue.overallScore * 0.4);
        
        // Risk assessment component (max 20 points)
        // Lower risk = higher score
        overallScore += ((100 - riskAssessment.overallRisk) * 0.2);
        
        // Round to nearest integer
        overallScore = Math.round(overallScore);
        
        // Determine partnership recommendation
        let recommendation;
        if (overallScore >= 80) {
            recommendation = 'Strongly Recommended';
        } else if (overallScore >= 60) {
            recommendation = 'Recommended';
        } else if (overallScore >= 40) {
            recommendation = 'Consider with Modifications';
        } else {
            recommendation = 'Not Recommended';
        }
        
        // Return comprehensive assessment
        return {
            overallScore,
            recommendation,
            financialROI,
            strategicValue,
            riskAssessment
        };
    }
    
    // Return public methods
    return {
        calculateFinancialROI,
        calculateStrategicValue,
        calculateRiskAssessment,
        calculatePartnershipROI
    };
})();