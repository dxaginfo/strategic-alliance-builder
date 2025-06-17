// Strategic Alliance Builder - Partner Matching Module

/**
 * PartnerMatcher - Handles partner matching and compatibility assessment
 */
const PartnerMatcher = (function() {
    // Matching criteria weights
    const weights = {
        industry: 0.20,      // 20% weight for industry alignment
        values: 0.25,        // 25% weight for shared values
        objectives: 0.25,    // 25% weight for partnership objectives
        geography: 0.15,     // 15% weight for geographic focus
        companySize: 0.15    // 15% weight for company size compatibility
    };
    
    /**
     * Calculate compatibility score between two brand profiles
     * @param {Object} brand1 - First brand profile
     * @param {Object} brand2 - Second brand profile
     * @returns {number} Compatibility score (0-100)
     */
    function calculateCompatibilityScore(brand1, brand2) {
        if (!brand1 || !brand2) {
            console.error('Invalid brand profiles for compatibility calculation');
            return 0;
        }
        
        let totalScore = 0;
        
        // Calculate industry alignment score
        const industryScore = calculateIndustryScore(brand1.industry, brand2.industry);
        totalScore += industryScore * weights.industry;
        
        // Calculate values alignment score
        const valuesScore = calculateValuesScore(brand1.values, brand2.values);
        totalScore += valuesScore * weights.values;
        
        // Calculate partnership objectives alignment score
        const objectivesScore = calculateObjectivesScore(
            brand1.partnership?.objectives || [], 
            brand2.partnership?.objectives || []
        );
        totalScore += objectivesScore * weights.objectives;
        
        // Calculate geographic focus alignment score
        const geographyScore = calculateGeographyScore(brand1.geographicFocus, brand2.geographicFocus);
        totalScore += geographyScore * weights.geography;
        
        // Calculate company size compatibility score
        const sizeScore = calculateSizeScore(brand1.companySize, brand2.companySize);
        totalScore += sizeScore * weights.companySize;
        
        // Convert to percentage (0-100) and round to nearest integer
        return Math.round(totalScore * 100);
    }
    
    /**
     * Calculate industry alignment score
     * @param {string} industry1 - First industry
     * @param {string} industry2 - Second industry
     * @returns {number} Score (0-1)
     */
    function calculateIndustryScore(industry1, industry2) {
        if (!industry1 || !industry2) return 0;
        
        // Direct industry match
        if (industry1 === industry2) return 1.0;
        
        // Complementary industries
        const complementaryIndustries = {
            'sports': ['entertainment', 'healthcare', 'retail'],
            'entertainment': ['sports', 'technology', 'retail'],
            'technology': ['entertainment', 'financial', 'healthcare'],
            'retail': ['sports', 'entertainment', 'food'],
            'financial': ['technology', 'education'],
            'healthcare': ['sports', 'technology', 'education'],
            'education': ['technology', 'healthcare', 'financial'],
            'food': ['retail', 'healthcare'],
            'automotive': ['technology', 'retail']
        };
        
        if (complementaryIndustries[industry1] && complementaryIndustries[industry1].includes(industry2)) {
            return 0.7;  // 70% score for complementary industries
        }
        
        // Default score for non-complementary industries
        return 0.3;  // 30% score for other combinations
    }
    
    /**
     * Calculate values alignment score
     * @param {Array} values1 - First set of values
     * @param {Array} values2 - Second set of values
     * @returns {number} Score (0-1)
     */
    function calculateValuesScore(values1, values2) {
        if (!Array.isArray(values1) || !Array.isArray(values2) || values1.length === 0 || values2.length === 0) {
            return 0;
        }
        
        // Count shared values
        const sharedValues = values1.filter(value => values2.includes(value));
        
        // Calculate score based on percentage of shared values
        const maxPossibleShared = Math.min(values1.length, values2.length);
        return sharedValues.length / maxPossibleShared;
    }
    
    /**
     * Calculate partnership objectives alignment score
     * @param {Array} objectives1 - First set of objectives
     * @param {Array} objectives2 - Second set of objectives
     * @returns {number} Score (0-1)
     */
    function calculateObjectivesScore(objectives1, objectives2) {
        if (!Array.isArray(objectives1) || !Array.isArray(objectives2) || 
            objectives1.length === 0 || objectives2.length === 0) {
            return 0;
        }
        
        // Count shared objectives
        const sharedObjectives = objectives1.filter(obj => objectives2.includes(obj));
        
        // Calculate score based on percentage of shared objectives
        const maxPossibleShared = Math.min(objectives1.length, objectives2.length);
        return sharedObjectives.length / maxPossibleShared;
    }
    
    /**
     * Calculate geographic focus alignment score
     * @param {string} geography1 - First geographic focus
     * @param {string} geography2 - Second geographic focus
     * @returns {number} Score (0-1)
     */
    function calculateGeographyScore(geography1, geography2) {
        if (!geography1 || !geography2) return 0;
        
        // Direct match
        if (geography1 === geography2) return 1.0;
        
        // Compatibility matrix for geographic focus
        const compatibilityMatrix = {
            'local': {'local': 1.0, 'regional': 0.8, 'national': 0.4, 'international': 0.2, 'global': 0.1},
            'regional': {'local': 0.8, 'regional': 1.0, 'national': 0.7, 'international': 0.3, 'global': 0.2},
            'national': {'local': 0.4, 'regional': 0.7, 'national': 1.0, 'international': 0.7, 'global': 0.5},
            'international': {'local': 0.2, 'regional': 0.3, 'national': 0.7, 'international': 1.0, 'global': 0.8},
            'global': {'local': 0.1, 'regional': 0.2, 'national': 0.5, 'international': 0.8, 'global': 1.0}
        };
        
        if (compatibilityMatrix[geography1] && compatibilityMatrix[geography1][geography2]) {
            return compatibilityMatrix[geography1][geography2];
        }
        
        return 0.3; // Default compatibility score
    }
    
    /**
     * Calculate company size compatibility score
     * @param {string} size1 - First company size
     * @param {string} size2 - Second company size
     * @returns {number} Score (0-1)
     */
    function calculateSizeScore(size1, size2) {
        if (!size1 || !size2) return 0;
        
        // Direct match
        if (size1 === size2) return 1.0;
        
        // Compatibility matrix for company sizes
        const compatibilityMatrix = {
            'startup': {'startup': 1.0, 'small': 0.9, 'medium': 0.6, 'large': 0.4, 'enterprise': 0.2},
            'small': {'startup': 0.9, 'small': 1.0, 'medium': 0.8, 'large': 0.5, 'enterprise': 0.3},
            'medium': {'startup': 0.6, 'small': 0.8, 'medium': 1.0, 'large': 0.8, 'enterprise': 0.6},
            'large': {'startup': 0.4, 'small': 0.5, 'medium': 0.8, 'large': 1.0, 'enterprise': 0.9},
            'enterprise': {'startup': 0.2, 'small': 0.3, 'medium': 0.6, 'large': 0.9, 'enterprise': 1.0}
        };
        
        if (compatibilityMatrix[size1] && compatibilityMatrix[size1][size2]) {
            return compatibilityMatrix[size1][size2];
        }
        
        return 0.5; // Default compatibility score
    }
    
    /**
     * Filter partners based on criteria
     * @param {Array} partners - List of potential partners
     * @param {Object} filters - Filter criteria
     * @returns {Array} Filtered partners
     */
    function filterPartners(partners, filters) {
        if (!Array.isArray(partners) || partners.length === 0) {
            return [];
        }
        
        return partners.filter(partner => {
            // Apply industry filter
            if (filters.industry && partner.industry !== filters.industry) {
                return false;
            }
            
            // Apply company size filter
            if (filters.companySize && partner.companySize !== filters.companySize) {
                return false;
            }
            
            // Apply geographic focus filter
            if (filters.geographicFocus && partner.geographicFocus !== filters.geographicFocus) {
                return false;
            }
            
            // Apply values filter
            if (filters.values && filters.values.length > 0 && 
                !filters.values.some(value => partner.values.includes(value))) {
                return false;
            }
            
            // Apply objectives filter
            if (filters.objectives && filters.objectives.length > 0 && 
                !filters.objectives.some(obj => partner.partnership.objectives.includes(obj))) {
                return false;
            }
            
            // All filters passed
            return true;
        });
    }
    
    /**
     * Sort partners by compatibility score
     * @param {Array} partners - List of partners with compatibility scores
     * @param {string} order - Sort order ('asc' or 'desc')
     * @returns {Array} Sorted partners
     */
    function sortPartnersByScore(partners, order = 'desc') {
        if (!Array.isArray(partners) || partners.length === 0) {
            return [];
        }
        
        const sortedPartners = [...partners];
        
        if (order === 'asc') {
            sortedPartners.sort((a, b) => a.compatibilityScore - b.compatibilityScore);
        } else {
            sortedPartners.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
        }
        
        return sortedPartners;
    }
    
    /**
     * Generate compatibility report
     * @param {Object} brand - Brand profile
     * @param {Object} partner - Partner profile
     * @returns {Object} Compatibility report with scores and recommendations
     */
    function generateCompatibilityReport(brand, partner) {
        if (!brand || !partner) {
            console.error('Invalid brand profiles for compatibility report');
            return null;
        }
        
        // Calculate overall score
        const overallScore = calculateCompatibilityScore(brand, partner);
        
        // Calculate individual dimension scores
        const industryScore = Math.round(calculateIndustryScore(brand.industry, partner.industry) * 100);
        const valuesScore = Math.round(calculateValuesScore(brand.values, partner.values) * 100);
        const objectivesScore = Math.round(calculateObjectivesScore(
            brand.partnership?.objectives || [], 
            partner.partnership?.objectives || []
        ) * 100);
        const geographyScore = Math.round(calculateGeographyScore(brand.geographicFocus, partner.geographicFocus) * 100);
        const sizeScore = Math.round(calculateSizeScore(brand.companySize, partner.companySize) * 100);
        
        // Identify strengths (scores >= 70)
        const strengths = [];
        if (industryScore >= 70) strengths.push('industry alignment');
        if (valuesScore >= 70) strengths.push('shared values');
        if (objectivesScore >= 70) strengths.push('compatible objectives');
        if (geographyScore >= 70) strengths.push('geographic alignment');
        if (sizeScore >= 70) strengths.push('company size compatibility');
        
        // Identify weaknesses (scores < 50)
        const weaknesses = [];
        if (industryScore < 50) weaknesses.push('industry alignment');
        if (valuesScore < 50) weaknesses.push('shared values');
        if (objectivesScore < 50) weaknesses.push('compatible objectives');
        if (geographyScore < 50) weaknesses.push('geographic alignment');
        if (sizeScore < 50) weaknesses.push('company size compatibility');
        
        // Generate recommendations
        const recommendations = [];
        
        if (weaknesses.includes('industry alignment')) {
            recommendations.push('Focus on cross-industry innovation opportunities.');
        }
        
        if (weaknesses.includes('shared values')) {
            recommendations.push('Identify and emphasize the specific values that do align.');
        }
        
        if (weaknesses.includes('compatible objectives')) {
            recommendations.push('Define clear partnership goals that benefit both organizations.');
        }
        
        if (weaknesses.includes('geographic alignment')) {
            recommendations.push('Consider a geographically focused pilot initiative.');
        }
        
        if (weaknesses.includes('company size compatibility')) {
            recommendations.push('Establish clear roles and responsibilities that leverage each organization\'s strengths.');
        }
        
        // Determine partnership type recommendations based on profiles
        const suggestedPartnershipTypes = [];
        
        // Co-branding recommendations
        if (valuesScore >= 70 && brand.industry !== partner.industry) {
            suggestedPartnershipTypes.push('co-branding');
        }
        
        // Product development recommendations
        if (industryScore >= 70 && 
            (brand.partnership?.objectives.includes('product') || 
             partner.partnership?.objectives.includes('product'))) {
            suggestedPartnershipTypes.push('product development');
        }
        
        // Content creation recommendations
        if (objectivesScore >= 70 && 
            (brand.partnership?.objectives.includes('content') || 
             partner.partnership?.objectives.includes('content'))) {
            suggestedPartnershipTypes.push('content creation');
        }
        
        // Distribution recommendations
        if (geographyScore >= 70 && 
            (brand.geographicFocus !== partner.geographicFocus)) {
            suggestedPartnershipTypes.push('distribution');
        }
        
        // Return the complete report
        return {
            overallScore,
            dimensionScores: {
                industry: industryScore,
                values: valuesScore,
                objectives: objectivesScore,
                geography: geographyScore,
                size: sizeScore
            },
            strengths,
            weaknesses,
            recommendations,
            suggestedPartnershipTypes
        };
    }
    
    /**
     * Find most promising partners
     * @param {Object} brand - Brand profile
     * @param {Array} partners - List of potential partners
     * @param {number} limit - Maximum number of partners to return
     * @returns {Array} Most promising partners with compatibility scores
     */
    function findMostPromisingPartners(brand, partners, limit = 5) {
        if (!brand || !Array.isArray(partners) || partners.length === 0) {
            return [];
        }
        
        // Calculate compatibility scores
        const partnersWithScores = partners.map(partner => ({
            ...partner,
            compatibilityScore: calculateCompatibilityScore(brand, partner)
        }));
        
        // Sort by score (descending)
        const sortedPartners = sortPartnersByScore(partnersWithScores);
        
        // Return top matches
        return sortedPartners.slice(0, limit);
    }
    
    // Return public methods
    return {
        calculateCompatibilityScore,
        filterPartners,
        sortPartnersByScore,
        generateCompatibilityReport,
        findMostPromisingPartners
    };
})();