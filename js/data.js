// Strategic Alliance Builder - Data Handling Utilities

/**
 * Data Manager - Handles data operations for the Strategic Alliance Builder application
 */
const DataManager = (function() {
    // Private variables
    const storageKey = 'strategicAllianceBuilder';
    
    /**
     * Save data to localStorage
     * @param {Object} data - The data to save
     */
    function saveData(data) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }
    
    /**
     * Load data from localStorage
     * @returns {Object|null} The loaded data or null if no data is found
     */
    function loadData() {
        try {
            const data = localStorage.getItem(storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }
    
    /**
     * Clear all data from localStorage
     * @returns {boolean} True if the operation was successful
     */
    function clearData() {
        try {
            localStorage.removeItem(storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }
    
    /**
     * Export data to a JSON file
     * @param {Object} data - The data to export
     * @param {string} filename - The name of the file
     */
    function exportData(data, filename) {
        try {
            // Create a JSON string
            const jsonString = JSON.stringify(data, null, 2);
            
            // Create a Blob
            const blob = new Blob([jsonString], {type: 'application/json'});
            
            // Create a download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || `strategic-alliance-builder-data-${new Date().toISOString().slice(0, 10)}.json`;
            
            // Trigger the download
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
            
            return true;
        } catch (error) {
            console.error('Error exporting data:', error);
            return false;
        }
    }
    
    /**
     * Import data from a JSON file
     * @param {File} file - The file to import
     * @returns {Promise} A promise that resolves with the imported data
     */
    function importData(file) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    try {
                        const importedData = JSON.parse(e.target.result);
                        resolve(importedData);
                    } catch (error) {
                        reject(new Error('Invalid JSON format.'));
                    }
                };
                
                reader.onerror = function() {
                    reject(new Error('Error reading file.'));
                };
                
                reader.readAsText(file);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Validate imported data
     * @param {Object} data - The data to validate
     * @returns {boolean} True if the data is valid
     */
    function validateImportedData(data) {
        // Check if the data has the expected structure
        if (!data) return false;
        
        // Check for required properties
        if (typeof data !== 'object') return false;
        
        // Data structure can vary, but at minimum it should have initialized and data properties
        if (data.initialized === undefined || !data.data) return false;
        
        return true;
    }
    
    /**
     * Generate a sample partnership
     * @param {Object} brandProfile - The brand profile to use for matching
     * @returns {Object} A sample partnership
     */
    function generateSamplePartnership(brandProfile) {
        // Sample partner profiles for matching
        const partnerProfiles = [
            {
                id: 'partner1',
                brandName: 'TechInnovate',
                industry: 'technology',
                companySize: 'large',
                geographicFocus: 'global',
                brandDescription: 'A leading technology company focused on innovative solutions for businesses.',
                values: ['innovation', 'quality', 'integrity'],
                partnership: {
                    objectives: ['product', 'innovation']
                }
            },
            {
                id: 'partner2',
                brandName: 'SportsFit',
                industry: 'sports',
                companySize: 'medium',
                geographicFocus: 'national',
                brandDescription: 'Sports and fitness brand dedicated to promoting active lifestyles.',
                values: ['community', 'excellence', 'authenticity'],
                partnership: {
                    objectives: ['audience', 'content']
                }
            },
            {
                id: 'partner3',
                brandName: 'MediaStream',
                industry: 'entertainment',
                companySize: 'enterprise',
                geographicFocus: 'international',
                brandDescription: 'Entertainment and media company providing streaming services.',
                values: ['creativity', 'customer', 'diversity'],
                partnership: {
                    objectives: ['content', 'audience']
                }
            },
            {
                id: 'partner4',
                brandName: 'EcoGoods',
                industry: 'retail',
                companySize: 'small',
                geographicFocus: 'regional',
                brandDescription: 'Sustainable consumer goods company with eco-friendly products.',
                values: ['sustainability', 'social', 'integrity'],
                partnership: {
                    objectives: ['credibility', 'sales']
                }
            },
            {
                id: 'partner5',
                brandName: 'FinSecure',
                industry: 'financial',
                companySize: 'large',
                geographicFocus: 'national',
                brandDescription: 'Financial services company providing banking and investment solutions.',
                values: ['integrity', 'excellence', 'customer'],
                partnership: {
                    objectives: ['credibility', 'audience']
                }
            },
            {
                id: 'partner6',
                brandName: 'HealthPlus',
                industry: 'healthcare',
                companySize: 'medium',
                geographicFocus: 'national',
                brandDescription: 'Healthcare provider focused on accessible and quality care.',
                values: ['quality', 'integrity', 'community'],
                partnership: {
                    objectives: ['audience', 'credibility']
                }
            }
        ];
        
        // If no brand profile is provided, return a random partner
        if (!brandProfile) {
            const randomIndex = Math.floor(Math.random() * partnerProfiles.length);
            const partner = partnerProfiles[randomIndex];
            
            // Add a random compatibility score
            partner.compatibilityScore = Math.floor(Math.random() * 61) + 40; // 40-100
            
            return partner;
        }
        
        // Calculate compatibility scores for each partner
        const partnersWithScores = partnerProfiles.map(partner => {
            const score = calculateCompatibilityScore(brandProfile, partner);
            return {
                ...partner,
                compatibilityScore: score
            };
        });
        
        // Sort by compatibility score
        partnersWithScores.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
        
        return partnersWithScores;
    }
    
    /**
     * Calculate compatibility score between two brands
     * @param {Object} brand1 - The first brand profile
     * @param {Object} brand2 - The second brand profile
     * @returns {number} Compatibility score (0-100)
     */
    function calculateCompatibilityScore(brand1, brand2) {
        let score = 0;
        
        // Industry alignment (max 20 points)
        if (brand1.industry === brand2.industry) {
            score += 20;
        } else {
            // Some industries pair well together (e.g., sports and media)
            const complementaryIndustries = {
                'sports': ['entertainment', 'healthcare', 'retail'],
                'entertainment': ['sports', 'technology', 'retail'],
                'technology': ['entertainment', 'financial', 'healthcare'],
                'retail': ['sports', 'entertainment'],
                'financial': ['technology'],
                'healthcare': ['sports', 'technology']
            };
            
            if (complementaryIndustries[brand1.industry] && 
                complementaryIndustries[brand1.industry].includes(brand2.industry)) {
                score += 10;
            }
        }
        
        // Geographic focus alignment (max 15 points)
        if (brand1.geographicFocus === brand2.geographicFocus) {
            score += 15;
        } else if (
            (brand1.geographicFocus === 'global' && ['international', 'national'].includes(brand2.geographicFocus)) ||
            (brand2.geographicFocus === 'global' && ['international', 'national'].includes(brand1.geographicFocus))
        ) {
            score += 10;
        } else if (
            (brand1.geographicFocus === 'international' && brand2.geographicFocus === 'national') ||
            (brand2.geographicFocus === 'international' && brand1.geographicFocus === 'national')
        ) {
            score += 8;
        }
        
        // Values alignment (max 25 points)
        const sharedValues = brand1.values.filter(value => brand2.values.includes(value));
        score += Math.min(25, sharedValues.length * 8);
        
        // Partnership objectives alignment (max 25 points)
        const brand1Objectives = brand1.partnership.objectives;
        const brand2Objectives = brand2.partnership.objectives;
        
        const sharedObjectives = brand1Objectives.filter(obj => brand2Objectives.includes(obj));
        score += Math.min(25, sharedObjectives.length * 10);
        
        // Company size compatibility (max 15 points)
        const sizeCompatibility = {
            'startup': { 'startup': 15, 'small': 12, 'medium': 8, 'large': 5, 'enterprise': 3 },
            'small': { 'startup': 12, 'small': 15, 'medium': 12, 'large': 8, 'enterprise': 5 },
            'medium': { 'startup': 8, 'small': 12, 'medium': 15, 'large': 12, 'small': 8 },
            'large': { 'startup': 5, 'small': 8, 'medium': 12, 'large': 15, 'enterprise': 12 },
            'enterprise': { 'startup': 3, 'small': 5, 'medium': 8, 'large': 12, 'enterprise': 15 }
        };
        
        if (sizeCompatibility[brand1.companySize] && sizeCompatibility[brand1.companySize][brand2.companySize]) {
            score += sizeCompatibility[brand1.companySize][brand2.companySize];
        }
        
        return Math.min(100, Math.max(0, score));
    }
    
    /**
     * Generate sample collaboration data
     * @returns {Array} Sample collaboration data
     */
    function generateSampleCollaborations() {
        return [
            {
                id: 'collab1',
                name: 'TechFit Partnership',
                partnerName: 'SportsFit',
                type: 'co-branding',
                description: 'Joint development of fitness tracking technology for sports enthusiasts.',
                startDate: '2025-01-15',
                endDate: '2025-12-31',
                objectives: ['product', 'innovation', 'audience'],
                tasks: [
                    {
                        id: 'task1',
                        title: 'Market Research',
                        description: 'Conduct market research to identify target audience needs.',
                        assignedTo: 'Marketing Team',
                        dueDate: '2025-02-15',
                        status: 'completed'
                    },
                    {
                        id: 'task2',
                        title: 'Product Design',
                        description: 'Design initial product concepts.',
                        assignedTo: 'Design Team',
                        dueDate: '2025-03-30',
                        status: 'in-progress'
                    },
                    {
                        id: 'task3',
                        title: 'Prototype Development',
                        description: 'Develop working prototypes for testing.',
                        assignedTo: 'Engineering Team',
                        dueDate: '2025-05-15',
                        status: 'pending'
                    }
                ],
                milestones: [
                    {
                        id: 'milestone1',
                        title: 'Product Concept Approval',
                        dueDate: '2025-03-15',
                        status: 'completed'
                    },
                    {
                        id: 'milestone2',
                        title: 'Prototype Testing',
                        dueDate: '2025-06-30',
                        status: 'pending'
                    },
                    {
                        id: 'milestone3',
                        title: 'Market Launch',
                        dueDate: '2025-10-01',
                        status: 'pending'
                    }
                ],
                createdAt: '2025-01-10T09:00:00Z',
                updatedAt: '2025-01-15T14:30:00Z'
            },
            {
                id: 'collab2',
                name: 'Sustainable Media Campaign',
                partnerName: 'EcoGoods',
                type: 'content',
                description: 'Joint content creation to promote sustainable consumer practices.',
                startDate: '2025-02-01',
                endDate: '2025-08-31',
                objectives: ['content', 'credibility', 'audience'],
                tasks: [
                    {
                        id: 'task1',
                        title: 'Content Strategy Development',
                        description: 'Develop comprehensive content strategy for the campaign.',
                        assignedTo: 'Content Team',
                        dueDate: '2025-02-28',
                        status: 'completed'
                    },
                    {
                        id: 'task2',
                        title: 'Video Production',
                        description: 'Produce video content for social media channels.',
                        assignedTo: 'Production Team',
                        dueDate: '2025-04-15',
                        status: 'pending'
                    }
                ],
                milestones: [
                    {
                        id: 'milestone1',
                        title: 'Campaign Launch',
                        dueDate: '2025-03-01',
                        status: 'completed'
                    },
                    {
                        id: 'milestone2',
                        title: 'Mid-Campaign Review',
                        dueDate: '2025-05-15',
                        status: 'pending'
                    }
                ],
                createdAt: '2025-01-20T10:15:00Z',
                updatedAt: '2025-02-02T11:45:00Z'
            }
        ];
    }
    
    /**
     * Generate sample resources
     * @returns {Array} Sample resources
     */
    function generateSampleResources() {
        return [
            {
                id: 'resource1',
                title: 'Tech-Sports Partnership Case Study',
                description: 'How a leading technology company partnered with a sports league to enhance fan engagement.',
                type: 'case',
                industry: 'sports',
                partnershipType: 'technology',
                content: 'Case study content would go here...',
                createdAt: '2024-12-10T09:00:00Z'
            },
            {
                id: 'resource2',
                title: 'Co-Branding Agreement Template',
                description: 'A comprehensive template for creating co-branding partnerships.',
                type: 'template',
                industry: 'retail',
                partnershipType: 'co-branding',
                content: 'Template content would go here...',
                createdAt: '2025-01-05T14:30:00Z'
            },
            {
                id: 'resource3',
                title: 'Content Creation Partnership Guide',
                description: 'Best practices for establishing successful content creation partnerships.',
                type: 'guide',
                industry: 'entertainment',
                partnershipType: 'content',
                content: 'Guide content would go here...',
                createdAt: '2025-01-15T11:20:00Z'
            },
            {
                id: 'resource4',
                title: 'Financial Services Partnership ROI Study',
                description: 'Analysis of ROI metrics from partnerships in the financial services sector.',
                type: 'case',
                industry: 'financial',
                partnershipType: 'distribution',
                content: 'ROI study content would go here...',
                createdAt: '2025-02-01T09:45:00Z'
            },
            {
                id: 'resource5',
                title: 'Partnership Evaluation Framework',
                description: 'A structured approach to evaluating potential strategic partnerships.',
                type: 'template',
                industry: 'healthcare',
                partnershipType: 'cause',
                content: 'Framework content would go here...',
                createdAt: '2025-02-10T16:00:00Z'
            },
            {
                id: 'resource6',
                title: 'Cross-Industry Innovation Partnerships',
                description: 'How partnerships across different industries can drive innovation.',
                type: 'guide',
                industry: 'technology',
                partnershipType: 'product',
                content: 'Innovation guide content would go here...',
                createdAt: '2025-02-20T10:30:00Z'
            }
        ];
    }
    
    /**
     * Generate a unique ID
     * @returns {string} A unique ID
     */
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
    
    // Return public methods
    return {
        saveData,
        loadData,
        clearData,
        exportData,
        importData,
        validateImportedData,
        generateSamplePartnership,
        generateSampleCollaborations,
        generateSampleResources,
        generateId
    };
})();