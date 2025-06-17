// Strategic Alliance Builder - Main Application

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Application state
    const app = {
        currentPage: 'dashboard',
        initialized: false,
        data: {
            profile: null,
            partners: [],
            collaborations: [],
            activities: [],
            customMetrics: [],
            settings: {
                theme: 'default',
                fontSize: 'medium',
                compactView: false
            }
        }
    };

    // Initialize UI components
    initializeUI();
    
    // Load data from localStorage
    loadData();
    
    // Show welcome modal for first-time users
    if (!app.initialized) {
        showWelcomeModal();
        app.initialized = true;
        saveData();
    }
    
    // Update UI with data
    updateUI();

    // Initialize page navigation
    initNavigation();

    // Initialize event listeners
    initEventListeners();

    /**
     * Initialize UI components
     */
    function initializeUI() {
        // Initialize Bootstrap components
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    /**
     * Initialize navigation between pages
     */
    function initNavigation() {
        const navLinks = document.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageName = this.getAttribute('data-page');
                navigateTo(pageName);
            });
        });
    }

    /**
     * Navigate to a specific page
     * @param {string} pageName - The name of the page to navigate to
     */
    function navigateTo(pageName) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });
        
        // Show the selected page
        document.getElementById(`${pageName}-page`).style.display = 'block';
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelector(`.nav-link[data-page="${pageName}"]`).classList.add('active');
        
        // Update current page
        app.currentPage = pageName;
    }

    /**
     * Initialize event listeners for various UI elements
     */
    function initEventListeners() {
        // Brand Profile Form
        const profileForm = document.getElementById('brand-profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveProfile();
            });
        }
        
        // Partner Search Form
        const partnerSearchForm = document.getElementById('partner-search-form');
        if (partnerSearchForm) {
            partnerSearchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                searchPartners();
            });
        }
        
        // Create Workspace Buttons
        const createWorkspaceBtn = document.getElementById('create-workspace-btn');
        const createWorkspaceBtnEmpty = document.getElementById('create-workspace-btn-empty');
        
        if (createWorkspaceBtn) {
            createWorkspaceBtn.addEventListener('click', function() {
                showCreateWorkspaceModal();
            });
        }
        
        if (createWorkspaceBtnEmpty) {
            createWorkspaceBtnEmpty.addEventListener('click', function() {
                showCreateWorkspaceModal();
            });
        }
        
        // Save Workspace Button
        const saveWorkspaceBtn = document.getElementById('save-workspace-btn');
        if (saveWorkspaceBtn) {
            saveWorkspaceBtn.addEventListener('click', function() {
                saveCollaboration();
            });
        }
        
        // Export Data Buttons
        const exportDataBtn = document.getElementById('export-data-btn');
        const settingsExportBtn = document.getElementById('settings-export-btn');
        
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', function() {
                exportData();
            });
        }
        
        if (settingsExportBtn) {
            settingsExportBtn.addEventListener('click', function() {
                exportData();
            });
        }
        
        // Import Data Button
        const importDataBtn = document.getElementById('settings-import-btn');
        if (importDataBtn) {
            importDataBtn.addEventListener('click', function() {
                importData();
            });
        }
        
        // Clear Data Button
        const clearDataBtn = document.getElementById('clear-data-btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', function() {
                showClearDataModal();
            });
        }
        
        // Confirm Clear Data Button
        const confirmClearDataBtn = document.getElementById('confirm-clear-data-btn');
        if (confirmClearDataBtn) {
            confirmClearDataBtn.addEventListener('click', function() {
                clearData();
            });
        }
        
        // Delete Confirmation Input
        const deleteConfirmation = document.getElementById('delete-confirmation');
        if (deleteConfirmation) {
            deleteConfirmation.addEventListener('input', function() {
                const confirmBtn = document.getElementById('confirm-clear-data-btn');
                confirmBtn.disabled = this.value !== 'DELETE';
            });
        }
        
        // Settings Navigation
        const settingsLinks = document.querySelectorAll('[data-settings]');
        settingsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const settingName = this.getAttribute('data-settings');
                navigateToSettings(settingName);
            });
        });
        
        // Add Custom Metric Button
        const addMetricBtn = document.getElementById('add-metric-btn');
        if (addMetricBtn) {
            addMetricBtn.addEventListener('click', function() {
                showAddMetricModal();
            });
        }
        
        // Save Metric Button
        const saveMetricBtn = document.getElementById('save-metric-btn');
        if (saveMetricBtn) {
            saveMetricBtn.addEventListener('click', function() {
                saveCustomMetric();
            });
        }
        
        // Theme Selector
        const themeSelector = document.getElementById('color-theme');
        if (themeSelector) {
            themeSelector.addEventListener('change', function() {
                updateTheme(this.value);
            });
        }
        
        // Font Size Selector
        const fontSizeSelector = document.getElementById('font-size');
        if (fontSizeSelector) {
            fontSizeSelector.addEventListener('change', function() {
                updateFontSize(this.value);
            });
        }
        
        // Compact View Toggle
        const compactViewToggle = document.getElementById('compact-view');
        if (compactViewToggle) {
            compactViewToggle.addEventListener('change', function() {
                updateCompactView(this.checked);
            });
        }
        
        // Resource Type Filter
        const resourceTypeFilter = document.getElementById('resource-type-filter');
        if (resourceTypeFilter) {
            resourceTypeFilter.addEventListener('change', function() {
                filterResources();
            });
        }
        
        // Resource Filters
        const resourceFilters = document.querySelectorAll('#resource-industry-filter, #resource-partnership-filter, #resource-sort');
        resourceFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                filterResources();
            });
        });
    }

    /**
     * Show the welcome modal for first-time users
     */
    function showWelcomeModal() {
        const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        welcomeModal.show();
    }

    /**
     * Show the create workspace modal
     */
    function showCreateWorkspaceModal() {
        const modal = new bootstrap.Modal(document.getElementById('createWorkspaceModal'));
        modal.show();
    }

    /**
     * Show the clear data confirmation modal
     */
    function showClearDataModal() {
        const modal = new bootstrap.Modal(document.getElementById('clearDataModal'));
        modal.show();
    }

    /**
     * Show the add custom metric modal
     */
    function showAddMetricModal() {
        const modal = new bootstrap.Modal(document.getElementById('addMetricModal'));
        modal.show();
    }

    /**
     * Navigate to a specific settings section
     * @param {string} settingName - The name of the settings section
     */
    function navigateToSettings(settingName) {
        // Hide all settings sections
        document.querySelectorAll('.settings-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected settings section
        document.getElementById(`${settingName}-settings`).style.display = 'block';
        
        // Update active settings link
        document.querySelectorAll('[data-settings]').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelector(`[data-settings="${settingName}"]`).classList.add('active');
    }

    /**
     * Save the brand profile
     */
    function saveProfile() {
        // Get form values
        const brandName = document.getElementById('brand-name').value;
        const industry = document.getElementById('industry').value;
        const companySize = document.getElementById('company-size').value;
        const geographicFocus = document.getElementById('geographic-focus').value;
        const brandDescription = document.getElementById('brand-description').value;
        
        // Get selected values
        const selectedValues = [];
        document.querySelectorAll('input[type="checkbox"][id^="value-"]:checked').forEach(checkbox => {
            selectedValues.push(checkbox.value);
        });
        
        // Get audience information
        const audienceAge = document.getElementById('audience-age').value;
        const audienceIncome = document.getElementById('audience-income').value;
        const audienceInterests = document.getElementById('audience-interests').value.split(',').map(item => item.trim());
        
        // Get partnership preferences
        const partnershipObjectives = [];
        document.querySelectorAll('input[type="checkbox"][id^="obj-"]:checked').forEach(checkbox => {
            partnershipObjectives.push(checkbox.value);
        });
        
        const partnershipDuration = document.getElementById('partnership-duration').value;
        const investmentLevel = document.getElementById('investment-level').value;
        const partnershipExperience = document.getElementById('partnership-experience').value;
        
        // Create profile object
        const profile = {
            brandName,
            industry,
            companySize,
            geographicFocus,
            brandDescription,
            values: selectedValues,
            audience: {
                age: audienceAge,
                income: audienceIncome,
                interests: audienceInterests
            },
            partnership: {
                objectives: partnershipObjectives,
                duration: partnershipDuration,
                investment: investmentLevel,
                experience: partnershipExperience
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Update app data
        app.data.profile = profile;
        
        // Save to localStorage
        saveData();
        
        // Add activity
        addActivity('Updated brand profile');
        
        // Show success message
        alert('Brand profile saved successfully.');
        
        // Update UI
        updateUI();
        
        // Navigate to dashboard
        navigateTo('dashboard');
    }

    /**
     * Search for potential partners
     */
    function searchPartners() {
        // In a real app, this would make an API call
        // For our demo, we'll generate sample partners

        // Get filter values
        const industryFilter = document.getElementById('filter-industry').value;
        const sizeFilter = document.getElementById('filter-size').value;
        const geographyFilter = document.getElementById('filter-geography').value;
        const valuesFilter = document.getElementById('filter-values').value;
        const objectiveFilter = document.getElementById('filter-objective').value;
        
        // Generate sample partners
        const partners = generateSamplePartners();
        
        // Apply filters if needed
        let filteredPartners = partners;
        
        if (industryFilter) {
            filteredPartners = filteredPartners.filter(partner => partner.industry === industryFilter);
        }
        
        if (sizeFilter) {
            filteredPartners = filteredPartners.filter(partner => partner.companySize === sizeFilter);
        }
        
        if (geographyFilter) {
            filteredPartners = filteredPartners.filter(partner => partner.geographicFocus === geographyFilter);
        }
        
        if (valuesFilter) {
            filteredPartners = filteredPartners.filter(partner => partner.values.includes(valuesFilter));
        }
        
        if (objectiveFilter) {
            filteredPartners = filteredPartners.filter(partner => partner.partnership.objectives.includes(objectiveFilter));
        }
        
        // Update the UI with results
        displayPartnerResults(filteredPartners);
        
        // Add activity
        addActivity('Searched for potential partners');
    }

    /**
     * Display partner search results
     * @param {Array} partners - The list of partners to display
     */
    function displayPartnerResults(partners) {
        const resultsContainer = document.getElementById('partner-results');
        const noPartnersMessage = document.getElementById('no-partners-message');
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        if (partners.length === 0) {
            // Show no results message
            noPartnersMessage.style.display = 'block';
            return;
        }
        
        // Hide no results message
        noPartnersMessage.style.display = 'none';
        
        // Add partner cards
        partners.forEach(partner => {
            // Create match score class based on compatibility
            let matchScoreClass = '';
            if (partner.compatibilityScore >= 80) {
                matchScoreClass = 'match-excellent';
            } else if (partner.compatibilityScore >= 60) {
                matchScoreClass = 'match-good';
            } else if (partner.compatibilityScore >= 40) {
                matchScoreClass = 'match-moderate';
            } else {
                matchScoreClass = 'match-low';
            }
            
            const partnerCard = document.createElement('div');
            partnerCard.className = 'col-md-4 mb-4';
            partnerCard.innerHTML = `
                <div class="card h-100 partner-card">
                    <div class="card-body position-relative">
                        <div class="match-score ${matchScoreClass}">${partner.compatibilityScore}%</div>
                        <h5 class="card-title">${partner.brandName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${getIndustryName(partner.industry)}</h6>
                        <p class="card-text">${partner.brandDescription}</p>
                        <div class="mb-3">
                            <small class="text-muted">Company Size:</small> ${getCompanySizeName(partner.companySize)}<br>
                            <small class="text-muted">Geographic Focus:</small> ${getGeographicFocusName(partner.geographicFocus)}
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">Core Values:</small><br>
                            ${partner.values.map(value => `<span class="badge bg-light text-dark me-1 mb-1">${getValueName(value)}</span>`).join('')}
                        </div>
                        <button class="btn btn-outline-primary btn-sm view-partner-btn" data-partner-id="${partner.id}">View Details</button>
                        <button class="btn btn-primary btn-sm create-collaboration-btn" data-partner-id="${partner.id}">Create Collaboration</button>
                    </div>
                </div>
            `;
            
            resultsContainer.appendChild(partnerCard);
        });
        
        // Add event listeners to the buttons
        document.querySelectorAll('.view-partner-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const partnerId = this.getAttribute('data-partner-id');
                viewPartnerDetails(partnerId);
            });
        });
        
        document.querySelectorAll('.create-collaboration-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const partnerId = this.getAttribute('data-partner-id');
                const partner = partners.find(p => p.id === partnerId);
                showCreateWorkspaceModalWithPartner(partner);
            });
        });
    }

    /**
     * View the details of a specific partner
     * @param {string} partnerId - The ID of the partner to view
     */
    function viewPartnerDetails(partnerId) {
        // In a real app, this would show a detailed view or navigate to a detail page
        alert('Partner details view would be shown here.');
    }

    /**
     * Show the create workspace modal with a specific partner pre-selected
     * @param {Object} partner - The partner to pre-select
     */
    function showCreateWorkspaceModalWithPartner(partner) {
        // Pre-fill the partner name
        document.getElementById('partner-name').value = partner.brandName;
        
        // Show the modal
        showCreateWorkspaceModal();
    }

    /**
     * Save a new collaboration
     */
    function saveCollaboration() {
        // Get form values
        const workspaceName = document.getElementById('workspace-name').value;
        const partnerName = document.getElementById('partner-name').value;
        const collaborationType = document.getElementById('collaboration-type').value;
        const description = document.getElementById('collaboration-description').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        // Get selected objectives
        const objectives = [];
        document.querySelectorAll('input[type="checkbox"][id^="collab-obj-"]:checked').forEach(checkbox => {
            objectives.push(checkbox.value);
        });
        
        // Create collaboration object
        const collaboration = {
            id: generateId(),
            name: workspaceName,
            partnerName,
            type: collaborationType,
            description,
            startDate,
            endDate,
            objectives,
            tasks: [],
            milestones: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Update app data
        app.data.collaborations.push(collaboration);
        
        // Save to localStorage
        saveData();
        
        // Add activity
        addActivity(`Created collaboration: ${workspaceName}`);
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createWorkspaceModal'));
        modal.hide();
        
        // Reset the form
        document.getElementById('create-workspace-form').reset();
        
        // Update UI
        updateUI();
        
        // Navigate to workspace page
        navigateTo('workspace');
        
        // Show success message
        alert('Collaboration created successfully.');
    }

    /**
     * Generate a list of sample partners
     * @returns {Array} List of sample partners
     */
    function generateSamplePartners() {
        return [
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
                },
                compatibilityScore: 85
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
                },
                compatibilityScore: 72
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
                },
                compatibilityScore: 68
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
                },
                compatibilityScore: 55
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
                },
                compatibilityScore: 42
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
                },
                compatibilityScore: 78
            }
        ];
    }

    /**
     * Save a custom metric
     */
    function saveCustomMetric() {
        // Get form values
        const metricName = document.getElementById('metric-name').value;
        const metricDescription = document.getElementById('metric-description').value;
        const metricType = document.getElementById('metric-type').value;
        const metricFrequency = document.getElementById('metric-frequency').value;
        
        // Create metric object
        const metric = {
            id: generateId(),
            name: metricName,
            description: metricDescription,
            type: metricType,
            frequency: metricFrequency,
            createdAt: new Date().toISOString()
        };
        
        // Update app data
        app.data.customMetrics.push(metric);
        
        // Save to localStorage
        saveData();
        
        // Add activity
        addActivity(`Added custom metric: ${metricName}`);
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addMetricModal'));
        modal.hide();
        
        // Reset the form
        document.getElementById('add-metric-form').reset();
        
        // Update UI
        updateCustomMetricsList();
    }

    /**
     * Update the custom metrics list in the UI
     */
    function updateCustomMetricsList() {
        const metricsContainer = document.getElementById('custom-metrics-list');
        const noMetricsMessage = document.getElementById('no-metrics-message');
        
        if (app.data.customMetrics.length === 0) {
            // Show no metrics message
            noMetricsMessage.style.display = 'block';
            return;
        }
        
        // Hide no metrics message
        noMetricsMessage.style.display = 'none';
        
        // Clear the container
        metricsContainer.innerHTML = '';
        
        // Add metrics
        app.data.customMetrics.forEach(metric => {
            const metricCard = document.createElement('div');
            metricCard.className = 'metric-card';
            metricCard.innerHTML = `
                <div class="metric-actions">
                    <button class="btn btn-sm btn-outline-primary edit-metric-btn" data-metric-id="${metric.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-metric-btn" data-metric-id="${metric.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <h6>${metric.name}</h6>
                <p>${metric.description}</p>
                <div class="d-flex justify-content-between">
                    <span class="badge bg-primary">${getMetricTypeName(metric.type)}</span>
                    <span class="badge bg-secondary">${getMetricFrequencyName(metric.frequency)}</span>
                </div>
            `;
            
            metricsContainer.appendChild(metricCard);
        });
        
        // Add event listeners
        document.querySelectorAll('.edit-metric-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const metricId = this.getAttribute('data-metric-id');
                editCustomMetric(metricId);
            });
        });
        
        document.querySelectorAll('.delete-metric-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const metricId = this.getAttribute('data-metric-id');
                deleteCustomMetric(metricId);
            });
        });
    }

    /**
     * Edit a custom metric
     * @param {string} metricId - The ID of the metric to edit
     */
    function editCustomMetric(metricId) {
        // In a real app, this would open the metric in the edit modal
        alert('Edit metric functionality would be implemented here.');
    }

    /**
     * Delete a custom metric
     * @param {string} metricId - The ID of the metric to delete
     */
    function deleteCustomMetric(metricId) {
        if (confirm('Are you sure you want to delete this metric?')) {
            // Remove the metric from the array
            app.data.customMetrics = app.data.customMetrics.filter(metric => metric.id !== metricId);
            
            // Save to localStorage
            saveData();
            
            // Update UI
            updateCustomMetricsList();
            
            // Add activity
            addActivity('Deleted a custom metric');
        }
    }

    /**
     * Update the UI theme
     * @param {string} theme - The theme to apply
     */
    function updateTheme(theme) {
        // Remove existing theme classes
        document.body.classList.remove('theme-green', 'theme-purple', 'theme-dark');
        
        // Add new theme class if needed
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Update app data
        app.data.settings.theme = theme;
        
        // Save to localStorage
        saveData();
    }

    /**
     * Update the font size
     * @param {string} fontSize - The font size to apply
     */
    function updateFontSize(fontSize) {
        // Remove existing font size classes
        document.body.classList.remove('font-small', 'font-large');
        
        // Add new font size class if needed
        if (fontSize !== 'medium') {
            document.body.classList.add(`font-${fontSize}`);
        }
        
        // Update app data
        app.data.settings.fontSize = fontSize;
        
        // Save to localStorage
        saveData();
    }

    /**
     * Update the compact view setting
     * @param {boolean} compactView - Whether to enable compact view
     */
    function updateCompactView(compactView) {
        // Toggle compact view class
        if (compactView) {
            document.body.classList.add('compact-view');
        } else {
            document.body.classList.remove('compact-view');
        }
        
        // Update app data
        app.data.settings.compactView = compactView;
        
        // Save to localStorage
        saveData();
    }

    /**
     * Filter resources in the library
     */
    function filterResources() {
        // In a real app, this would filter resources based on selected criteria
        // For our demo, we'll just show a message
        alert('Resource filtering functionality would be implemented here.');
    }

    /**
     * Add an activity to the activity log
     * @param {string} description - Description of the activity
     */
    function addActivity(description) {
        const activity = {
            id: generateId(),
            description,
            timestamp: new Date().toISOString()
        };
        
        // Add to the beginning of the array
        app.data.activities.unshift(activity);
        
        // Limit to the most recent 10 activities
        if (app.data.activities.length > 10) {
            app.data.activities = app.data.activities.slice(0, 10);
        }
        
        // Save to localStorage
        saveData();
        
        // Update activity list in the UI
        updateActivityList();
    }

    /**
     * Update the activity list in the UI
     */
    function updateActivityList() {
        const activityList = document.getElementById('activity-list');
        const noActivitiesMessage = document.getElementById('no-activities');
        
        if (app.data.activities.length === 0) {
            // Show no activities message
            noActivitiesMessage.style.display = 'block';
            activityList.style.display = 'none';
            return;
        }
        
        // Hide no activities message
        noActivitiesMessage.style.display = 'none';
        activityList.style.display = 'block';
        
        // Clear the list
        activityList.innerHTML = '';
        
        // Add activities
        app.data.activities.forEach(activity => {
            const date = new Date(activity.timestamp);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>${activity.description}</div>
                    <small class="text-muted">${formattedDate}</small>
                </div>
            `;
            
            activityList.appendChild(li);
        });
    }

    /**
     * Export data to a JSON file
     */
    function exportData() {
        // Create a JSON string
        const jsonString = JSON.stringify(app.data);
        
        // Create a Blob
        const blob = new Blob([jsonString], {type: 'application/json'});
        
        // Create a download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `strategic-alliance-builder-data-${new Date().toISOString().slice(0, 10)}.json`;
        
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
        
        // Add activity
        addActivity('Exported data');
    }

    /**
     * Import data from a JSON file
     */
    function importData() {
        const fileInput = document.getElementById('import-file');
        
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please select a file to import.');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Validate the imported data
                if (!importedData.profile && !importedData.collaborations) {
                    throw new Error('Invalid data format.');
                }
                
                // Confirm import
                if (confirm('This will replace your current data. Are you sure you want to continue?')) {
                    // Update app data
                    app.data = importedData;
                    
                    // Save to localStorage
                    saveData();
                    
                    // Update UI
                    updateUI();
                    
                    // Add activity
                    addActivity('Imported data');
                    
                    // Show success message
                    alert('Data imported successfully.');
                    
                    // Reset the file input
                    fileInput.value = '';
                }
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }

    /**
     * Clear all data and reset the application
     */
    function clearData() {
        // Reset app data
        app.data = {
            profile: null,
            partners: [],
            collaborations: [],
            activities: [],
            customMetrics: [],
            settings: {
                theme: 'default',
                fontSize: 'medium',
                compactView: false
            }
        };
        
        // Save to localStorage
        saveData();
        
        // Update UI
        updateUI();
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('clearDataModal'));
        modal.hide();
        
        // Reset the confirmation input
        document.getElementById('delete-confirmation').value = '';
        
        // Show success message
        alert('All data has been cleared.');
        
        // Navigate to dashboard
        navigateTo('dashboard');
    }

    /**
     * Save data to localStorage
     */
    function saveData() {
        localStorage.setItem('strategicAllianceBuilder', JSON.stringify({
            initialized: app.initialized,
            data: app.data
        }));
    }

    /**
     * Load data from localStorage
     */
    function loadData() {
        const savedData = localStorage.getItem('strategicAllianceBuilder');
        
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            app.initialized = parsedData.initialized;
            app.data = parsedData.data;
            
            // Apply settings
            applySettings();
        }
    }

    /**
     * Apply user settings
     */
    function applySettings() {
        // Apply theme
        updateTheme(app.data.settings.theme);
        
        // Apply font size
        updateFontSize(app.data.settings.fontSize);
        
        // Apply compact view
        updateCompactView(app.data.settings.compactView);
        
        // Update settings form
        const themeSelector = document.getElementById('color-theme');
        const fontSizeSelector = document.getElementById('font-size');
        const compactViewToggle = document.getElementById('compact-view');
        
        if (themeSelector) {
            themeSelector.value = app.data.settings.theme;
        }
        
        if (fontSizeSelector) {
            fontSizeSelector.value = app.data.settings.fontSize;
        }
        
        if (compactViewToggle) {
            compactViewToggle.checked = app.data.settings.compactView;
        }
    }

    /**
     * Update the UI with current data
     */
    function updateUI() {
        // Update dashboard
        updateDashboard();
        
        // Update profile status
        updateProfileStatus();
        
        // Update activity list
        updateActivityList();
        
        // Update custom metrics list
        updateCustomMetricsList();
        
        // Load resources
        loadResources();
    }

    /**
     * Update the dashboard UI
     */
    function updateDashboard() {
        // Update collaboration count
        const collaborationCountElement = document.querySelector('#dashboard-page .card:nth-child(3) .display-4');
        if (collaborationCountElement) {
            collaborationCountElement.textContent = app.data.collaborations.length;
        }
    }

    /**
     * Update the profile status indicator
     */
    function updateProfileStatus() {
        const profileStatus = document.getElementById('profile-status');
        
        if (profileStatus) {
            if (app.data.profile) {
                profileStatus.textContent = 'Complete';
                profileStatus.className = 'badge bg-success';
            } else {
                profileStatus.textContent = 'Incomplete';
                profileStatus.className = 'badge bg-warning';
            }
        }
    }

    /**
     * Load resources into the resource library
     */
    function loadResources() {
        const resourceList = document.getElementById('resource-list');
        
        if (!resourceList) return;
        
        // Clear the list
        resourceList.innerHTML = '';
        
        // Load sample resources
        const resources = getSampleResources();
        
        // Add resources to the UI
        resources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'col-md-4 mb-4';
            resourceCard.innerHTML = `
                <div class="card h-100 resource-card">
                    <div class="card-body position-relative">
                        <span class="resource-type-badge bg-${getResourceTypeBadgeColor(resource.type)}">${getResourceTypeName(resource.type)}</span>
                        <div class="text-center mb-3">
                            <i class="${getResourceTypeIcon(resource.type)} resource-icon"></i>
                        </div>
                        <h5 class="card-title">${resource.title}</h5>
                        <p class="card-text">${resource.description}</p>
                        <div class="mb-3">
                            <span class="badge bg-light text-dark me-1">${getIndustryName(resource.industry)}</span>
                            <span class="badge bg-light text-dark">${getPartnershipTypeName(resource.partnershipType)}</span>
                        </div>
                        <button class="btn btn-primary btn-sm view-resource-btn" data-resource-id="${resource.id}">View Resource</button>
                    </div>
                </div>
            `;
            
            resourceList.appendChild(resourceCard);
        });
        
        // Add event listeners
        document.querySelectorAll('.view-resource-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const resourceId = this.getAttribute('data-resource-id');
                viewResource(resourceId);
            });
        });
    }

    /**
     * View a specific resource
     * @param {string} resourceId - The ID of the resource to view
     */
    function viewResource(resourceId) {
        // In a real app, this would show a detailed view or download the resource
        alert('Resource view functionality would be implemented here.');
    }

    /**
     * Get a list of sample resources
     * @returns {Array} List of sample resources
     */
    function getSampleResources() {
        return [
            {
                id: 'resource1',
                title: 'Tech-Sports Partnership Case Study',
                description: 'How a leading technology company partnered with a sports league to enhance fan engagement.',
                type: 'case',
                industry: 'sports',
                partnershipType: 'technology'
            },
            {
                id: 'resource2',
                title: 'Co-Branding Agreement Template',
                description: 'A comprehensive template for creating co-branding partnerships.',
                type: 'template',
                industry: 'retail',
                partnershipType: 'co-branding'
            },
            {
                id: 'resource3',
                title: 'Content Creation Partnership Guide',
                description: 'Best practices for establishing successful content creation partnerships.',
                type: 'guide',
                industry: 'entertainment',
                partnershipType: 'content'
            },
            {
                id: 'resource4',
                title: 'Financial Services Partnership ROI Study',
                description: 'Analysis of ROI metrics from partnerships in the financial services sector.',
                type: 'case',
                industry: 'financial',
                partnershipType: 'distribution'
            },
            {
                id: 'resource5',
                title: 'Partnership Evaluation Framework',
                description: 'A structured approach to evaluating potential strategic partnerships.',
                type: 'template',
                industry: 'healthcare',
                partnershipType: 'cause'
            },
            {
                id: 'resource6',
                title: 'Cross-Industry Innovation Partnerships',
                description: 'How partnerships across different industries can drive innovation.',
                type: 'guide',
                industry: 'technology',
                partnershipType: 'product'
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

    /**
     * Get the display name for an industry
     * @param {string} industry - The industry code
     * @returns {string} The display name
     */
    function getIndustryName(industry) {
        const industries = {
            'sports': 'Sports & Recreation',
            'entertainment': 'Entertainment & Media',
            'technology': 'Technology',
            'retail': 'Retail & Consumer Goods',
            'financial': 'Financial Services',
            'healthcare': 'Healthcare',
            'education': 'Education',
            'food': 'Food & Beverage',
            'automotive': 'Automotive',
            'other': 'Other'
        };
        
        return industries[industry] || industry;
    }

    /**
     * Get the display name for a company size
     * @param {string} size - The company size code
     * @returns {string} The display name
     */
    function getCompanySizeName(size) {
        const sizes = {
            'startup': 'Startup (1-10 employees)',
            'small': 'Small (11-50 employees)',
            'medium': 'Medium (51-250 employees)',
            'large': 'Large (251-1000 employees)',
            'enterprise': 'Enterprise (1000+ employees)'
        };
        
        return sizes[size] || size;
    }

    /**
     * Get the display name for a geographic focus
     * @param {string} focus - The geographic focus code
     * @returns {string} The display name
     */
    function getGeographicFocusName(focus) {
        const focuses = {
            'local': 'Local',
            'regional': 'Regional',
            'national': 'National',
            'international': 'International',
            'global': 'Global'
        };
        
        return focuses[focus] || focus;
    }

    /**
     * Get the display name for a value
     * @param {string} value - The value code
     * @returns {string} The display name
     */
    function getValueName(value) {
        const values = {
            'innovation': 'Innovation',
            'quality': 'Quality',
            'sustainability': 'Sustainability',
            'diversity': 'Diversity & Inclusion',
            'community': 'Community',
            'customer': 'Customer Focus',
            'integrity': 'Integrity',
            'excellence': 'Excellence',
            'authenticity': 'Authenticity',
            'teamwork': 'Teamwork',
            'creativity': 'Creativity',
            'social': 'Social Responsibility'
        };
        
        return values[value] || value;
    }

    /**
     * Get the display name for a metric type
     * @param {string} type - The metric type code
     * @returns {string} The display name
     */
    function getMetricTypeName(type) {
        const types = {
            'numeric': 'Numeric',
            'percentage': 'Percentage',
            'currency': 'Currency',
            'scale': 'Scale (1-5)'
        };
        
        return types[type] || type;
    }

    /**
     * Get the display name for a metric frequency
     * @param {string} frequency - The frequency code
     * @returns {string} The display name
     */
    function getMetricFrequencyName(frequency) {
        const frequencies = {
            'once': 'One-time',
            'weekly': 'Weekly',
            'monthly': 'Monthly',
            'quarterly': 'Quarterly',
            'annually': 'Annually'
        };
        
        return frequencies[frequency] || frequency;
    }

    /**
     * Get the display name for a resource type
     * @param {string} type - The resource type code
     * @returns {string} The display name
     */
    function getResourceTypeName(type) {
        const types = {
            'case': 'Case Study',
            'template': 'Template',
            'guide': 'Guide'
        };
        
        return types[type] || type;
    }

    /**
     * Get the badge color for a resource type
     * @param {string} type - The resource type code
     * @returns {string} The badge color class
     */
    function getResourceTypeBadgeColor(type) {
        const colors = {
            'case': 'primary',
            'template': 'success',
            'guide': 'info'
        };
        
        return colors[type] || 'secondary';
    }

    /**
     * Get the icon for a resource type
     * @param {string} type - The resource type code
     * @returns {string} The icon class
     */
    function getResourceTypeIcon(type) {
        const icons = {
            'case': 'bi bi-file-text',
            'template': 'bi bi-file-earmark-code',
            'guide': 'bi bi-book'
        };
        
        return icons[type] || 'bi bi-file';
    }

    /**
     * Get the display name for a partnership type
     * @param {string} type - The partnership type code
     * @returns {string} The display name
     */
    function getPartnershipTypeName(type) {
        const types = {
            'co-branding': 'Co-Branding',
            'product': 'Product Development',
            'content': 'Content Creation',
            'distribution': 'Distribution',
            'technology': 'Technology Integration',
            'cause': 'Cause Marketing'
        };
        
        return types[type] || type;
    }
});