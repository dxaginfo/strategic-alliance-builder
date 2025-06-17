// Strategic Alliance Builder - Project Management Module

/**
 * ProjectManager - Handles collaboration workspace management functionality
 */
const ProjectManager = (function() {
    /**
     * Create a new collaboration workspace
     * @param {Object} collaboration - Collaboration details
     * @returns {Object} The created collaboration with additional properties
     */
    function createCollaboration(collaboration) {
        if (!collaboration) {
            console.error('Invalid collaboration data');
            return null;
        }
        
        // Ensure required properties
        const newCollaboration = {
            id: collaboration.id || generateId(),
            name: collaboration.name || 'Unnamed Collaboration',
            partnerName: collaboration.partnerName || 'Unknown Partner',
            type: collaboration.type || 'other',
            description: collaboration.description || '',
            startDate: collaboration.startDate || new Date().toISOString().slice(0, 10),
            endDate: collaboration.endDate || null,
            objectives: collaboration.objectives || [],
            tasks: collaboration.tasks || [],
            milestones: collaboration.milestones || [],
            documents: collaboration.documents || [],
            notes: collaboration.notes || [],
            status: collaboration.status || 'active',
            createdAt: collaboration.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return newCollaboration;
    }
    
    /**
     * Update an existing collaboration
     * @param {Object} collaboration - Existing collaboration
     * @param {Object} updates - Properties to update
     * @returns {Object} Updated collaboration
     */
    function updateCollaboration(collaboration, updates) {
        if (!collaboration || !updates) {
            console.error('Invalid data for collaboration update');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            // Don't update id or creation date
            if (key !== 'id' && key !== 'createdAt') {
                updatedCollaboration[key] = updates[key];
            }
        });
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Add a task to a collaboration
     * @param {Object} collaboration - Collaboration to add task to
     * @param {Object} task - Task to add
     * @returns {Object} Updated collaboration
     */
    function addTask(collaboration, task) {
        if (!collaboration || !task) {
            console.error('Invalid data for adding task');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure tasks array exists
        if (!updatedCollaboration.tasks) {
            updatedCollaboration.tasks = [];
        }
        
        // Prepare the task
        const newTask = {
            id: task.id || generateId(),
            title: task.title || 'Untitled Task',
            description: task.description || '',
            assignedTo: task.assignedTo || '',
            dueDate: task.dueDate || null,
            status: task.status || 'pending', // pending, in-progress, completed, cancelled
            priority: task.priority || 'medium', // low, medium, high
            createdAt: task.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add the task
        updatedCollaboration.tasks.push(newTask);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Update a task in a collaboration
     * @param {Object} collaboration - Collaboration containing the task
     * @param {string} taskId - ID of the task to update
     * @param {Object} updates - Properties to update
     * @returns {Object} Updated collaboration
     */
    function updateTask(collaboration, taskId, updates) {
        if (!collaboration || !taskId || !updates) {
            console.error('Invalid data for updating task');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure tasks array exists
        if (!updatedCollaboration.tasks) {
            return updatedCollaboration;
        }
        
        // Find the task
        const taskIndex = updatedCollaboration.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
            console.error('Task not found:', taskId);
            return updatedCollaboration;
        }
        
        // Create a copy of the task
        const updatedTask = { ...updatedCollaboration.tasks[taskIndex] };
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            // Don't update id or creation date
            if (key !== 'id' && key !== 'createdAt') {
                updatedTask[key] = updates[key];
            }
        });
        
        // Update the updatedAt timestamp
        updatedTask.updatedAt = new Date().toISOString();
        
        // Replace the task in the array
        updatedCollaboration.tasks[taskIndex] = updatedTask;
        
        // Update the collaboration updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Delete a task from a collaboration
     * @param {Object} collaboration - Collaboration containing the task
     * @param {string} taskId - ID of the task to delete
     * @returns {Object} Updated collaboration
     */
    function deleteTask(collaboration, taskId) {
        if (!collaboration || !taskId) {
            console.error('Invalid data for deleting task');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure tasks array exists
        if (!updatedCollaboration.tasks) {
            return updatedCollaboration;
        }
        
        // Filter out the task
        updatedCollaboration.tasks = updatedCollaboration.tasks.filter(task => task.id !== taskId);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Add a milestone to a collaboration
     * @param {Object} collaboration - Collaboration to add milestone to
     * @param {Object} milestone - Milestone to add
     * @returns {Object} Updated collaboration
     */
    function addMilestone(collaboration, milestone) {
        if (!collaboration || !milestone) {
            console.error('Invalid data for adding milestone');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure milestones array exists
        if (!updatedCollaboration.milestones) {
            updatedCollaboration.milestones = [];
        }
        
        // Prepare the milestone
        const newMilestone = {
            id: milestone.id || generateId(),
            title: milestone.title || 'Untitled Milestone',
            description: milestone.description || '',
            dueDate: milestone.dueDate || null,
            status: milestone.status || 'pending', // pending, completed, missed
            createdAt: milestone.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add the milestone
        updatedCollaboration.milestones.push(newMilestone);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Update a milestone in a collaboration
     * @param {Object} collaboration - Collaboration containing the milestone
     * @param {string} milestoneId - ID of the milestone to update
     * @param {Object} updates - Properties to update
     * @returns {Object} Updated collaboration
     */
    function updateMilestone(collaboration, milestoneId, updates) {
        if (!collaboration || !milestoneId || !updates) {
            console.error('Invalid data for updating milestone');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure milestones array exists
        if (!updatedCollaboration.milestones) {
            return updatedCollaboration;
        }
        
        // Find the milestone
        const milestoneIndex = updatedCollaboration.milestones.findIndex(
            milestone => milestone.id === milestoneId
        );
        
        if (milestoneIndex === -1) {
            console.error('Milestone not found:', milestoneId);
            return updatedCollaboration;
        }
        
        // Create a copy of the milestone
        const updatedMilestone = { ...updatedCollaboration.milestones[milestoneIndex] };
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            // Don't update id or creation date
            if (key !== 'id' && key !== 'createdAt') {
                updatedMilestone[key] = updates[key];
            }
        });
        
        // Update the updatedAt timestamp
        updatedMilestone.updatedAt = new Date().toISOString();
        
        // Replace the milestone in the array
        updatedCollaboration.milestones[milestoneIndex] = updatedMilestone;
        
        // Update the collaboration updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Delete a milestone from a collaboration
     * @param {Object} collaboration - Collaboration containing the milestone
     * @param {string} milestoneId - ID of the milestone to delete
     * @returns {Object} Updated collaboration
     */
    function deleteMilestone(collaboration, milestoneId) {
        if (!collaboration || !milestoneId) {
            console.error('Invalid data for deleting milestone');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure milestones array exists
        if (!updatedCollaboration.milestones) {
            return updatedCollaboration;
        }
        
        // Filter out the milestone
        updatedCollaboration.milestones = updatedCollaboration.milestones.filter(
            milestone => milestone.id !== milestoneId
        );
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Add a document to a collaboration
     * @param {Object} collaboration - Collaboration to add document to
     * @param {Object} document - Document to add
     * @returns {Object} Updated collaboration
     */
    function addDocument(collaboration, document) {
        if (!collaboration || !document) {
            console.error('Invalid data for adding document');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure documents array exists
        if (!updatedCollaboration.documents) {
            updatedCollaboration.documents = [];
        }
        
        // Prepare the document
        const newDocument = {
            id: document.id || generateId(),
            title: document.title || 'Untitled Document',
            description: document.description || '',
            fileType: document.fileType || 'other',
            url: document.url || '',
            version: document.version || '1.0',
            createdBy: document.createdBy || '',
            createdAt: document.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add the document
        updatedCollaboration.documents.push(newDocument);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Update a document in a collaboration
     * @param {Object} collaboration - Collaboration containing the document
     * @param {string} documentId - ID of the document to update
     * @param {Object} updates - Properties to update
     * @returns {Object} Updated collaboration
     */
    function updateDocument(collaboration, documentId, updates) {
        if (!collaboration || !documentId || !updates) {
            console.error('Invalid data for updating document');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure documents array exists
        if (!updatedCollaboration.documents) {
            return updatedCollaboration;
        }
        
        // Find the document
        const documentIndex = updatedCollaboration.documents.findIndex(
            document => document.id === documentId
        );
        
        if (documentIndex === -1) {
            console.error('Document not found:', documentId);
            return updatedCollaboration;
        }
        
        // Create a copy of the document
        const updatedDocument = { ...updatedCollaboration.documents[documentIndex] };
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            // Don't update id or creation date
            if (key !== 'id' && key !== 'createdAt') {
                updatedDocument[key] = updates[key];
            }
        });
        
        // Update the updatedAt timestamp
        updatedDocument.updatedAt = new Date().toISOString();
        
        // Replace the document in the array
        updatedCollaboration.documents[documentIndex] = updatedDocument;
        
        // Update the collaboration updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Delete a document from a collaboration
     * @param {Object} collaboration - Collaboration containing the document
     * @param {string} documentId - ID of the document to delete
     * @returns {Object} Updated collaboration
     */
    function deleteDocument(collaboration, documentId) {
        if (!collaboration || !documentId) {
            console.error('Invalid data for deleting document');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure documents array exists
        if (!updatedCollaboration.documents) {
            return updatedCollaboration;
        }
        
        // Filter out the document
        updatedCollaboration.documents = updatedCollaboration.documents.filter(
            document => document.id !== documentId
        );
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Add a note to a collaboration
     * @param {Object} collaboration - Collaboration to add note to
     * @param {Object} note - Note to add
     * @returns {Object} Updated collaboration
     */
    function addNote(collaboration, note) {
        if (!collaboration || !note) {
            console.error('Invalid data for adding note');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure notes array exists
        if (!updatedCollaboration.notes) {
            updatedCollaboration.notes = [];
        }
        
        // Prepare the note
        const newNote = {
            id: note.id || generateId(),
            title: note.title || 'Untitled Note',
            content: note.content || '',
            createdBy: note.createdBy || '',
            createdAt: note.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add the note
        updatedCollaboration.notes.push(newNote);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Update a note in a collaboration
     * @param {Object} collaboration - Collaboration containing the note
     * @param {string} noteId - ID of the note to update
     * @param {Object} updates - Properties to update
     * @returns {Object} Updated collaboration
     */
    function updateNote(collaboration, noteId, updates) {
        if (!collaboration || !noteId || !updates) {
            console.error('Invalid data for updating note');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure notes array exists
        if (!updatedCollaboration.notes) {
            return updatedCollaboration;
        }
        
        // Find the note
        const noteIndex = updatedCollaboration.notes.findIndex(note => note.id === noteId);
        
        if (noteIndex === -1) {
            console.error('Note not found:', noteId);
            return updatedCollaboration;
        }
        
        // Create a copy of the note
        const updatedNote = { ...updatedCollaboration.notes[noteIndex] };
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            // Don't update id or creation date
            if (key !== 'id' && key !== 'createdAt') {
                updatedNote[key] = updates[key];
            }
        });
        
        // Update the updatedAt timestamp
        updatedNote.updatedAt = new Date().toISOString();
        
        // Replace the note in the array
        updatedCollaboration.notes[noteIndex] = updatedNote;
        
        // Update the collaboration updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Delete a note from a collaboration
     * @param {Object} collaboration - Collaboration containing the note
     * @param {string} noteId - ID of the note to delete
     * @returns {Object} Updated collaboration
     */
    function deleteNote(collaboration, noteId) {
        if (!collaboration || !noteId) {
            console.error('Invalid data for deleting note');
            return collaboration;
        }
        
        // Create a copy of the collaboration
        const updatedCollaboration = { ...collaboration };
        
        // Ensure notes array exists
        if (!updatedCollaboration.notes) {
            return updatedCollaboration;
        }
        
        // Filter out the note
        updatedCollaboration.notes = updatedCollaboration.notes.filter(note => note.id !== noteId);
        
        // Update the updatedAt timestamp
        updatedCollaboration.updatedAt = new Date().toISOString();
        
        return updatedCollaboration;
    }
    
    /**
     * Calculate collaboration progress
     * @param {Object} collaboration - Collaboration to calculate progress for
     * @returns {Object} Progress statistics
     */
    function calculateProgress(collaboration) {
        if (!collaboration) {
            console.error('Invalid collaboration for progress calculation');
            return null;
        }
        
        // Calculate task progress
        const taskStats = calculateTaskProgress(collaboration.tasks || []);
        
        // Calculate milestone progress
        const milestoneStats = calculateMilestoneProgress(collaboration.milestones || []);
        
        // Calculate overall progress (weighted 60% tasks, 40% milestones)
        const overallProgress = Math.round((taskStats.progressPercentage * 0.6) + 
                                          (milestoneStats.progressPercentage * 0.4));
        
        // Calculate days remaining
        let daysRemaining = null;
        if (collaboration.endDate) {
            const endDate = new Date(collaboration.endDate);
            const currentDate = new Date();
            const timeDiff = endDate - currentDate;
            daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        }
        
        // Calculate project status
        let status = 'On Track';
        
        if (daysRemaining !== null) {
            // If we have an end date, check if we're behind schedule
            const totalDuration = (new Date(collaboration.endDate) - new Date(collaboration.startDate)) / 
                                  (1000 * 60 * 60 * 24);
            const elapsedDuration = totalDuration - daysRemaining;
            const expectedProgress = Math.round((elapsedDuration / totalDuration) * 100);
            
            if (overallProgress < expectedProgress - 10) {
                status = 'Behind Schedule';
            } else if (overallProgress < expectedProgress - 20) {
                status = 'At Risk';
            }
        }
        
        return {
            overallProgress,
            status,
            daysRemaining,
            taskStats,
            milestoneStats
        };
    }
    
    /**
     * Calculate task progress
     * @param {Array} tasks - List of tasks
     * @returns {Object} Task progress statistics
     */
    function calculateTaskProgress(tasks) {
        if (!Array.isArray(tasks)) {
            return {
                total: 0,
                completed: 0,
                inProgress: 0,
                pending: 0,
                progressPercentage: 0
            };
        }
        
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const inProgress = tasks.filter(task => task.status === 'in-progress').length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        
        // Calculate progress percentage (completed tasks + half of in-progress tasks)
        const progressPercentage = total > 0 ? 
            Math.round(((completed + (inProgress * 0.5)) / total) * 100) : 0;
        
        return {
            total,
            completed,
            inProgress,
            pending,
            progressPercentage
        };
    }
    
    /**
     * Calculate milestone progress
     * @param {Array} milestones - List of milestones
     * @returns {Object} Milestone progress statistics
     */
    function calculateMilestoneProgress(milestones) {
        if (!Array.isArray(milestones)) {
            return {
                total: 0,
                completed: 0,
                pending: 0,
                missed: 0,
                progressPercentage: 0
            };
        }
        
        const total = milestones.length;
        const completed = milestones.filter(milestone => milestone.status === 'completed').length;
        const pending = milestones.filter(milestone => milestone.status === 'pending').length;
        const missed = milestones.filter(milestone => milestone.status === 'missed').length;
        
        // Calculate progress percentage (completed milestones)
        const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return {
            total,
            completed,
            pending,
            missed,
            progressPercentage
        };
    }
    
    /**
     * Generate a sample collaboration
     * @param {string} name - Collaboration name
     * @param {string} partnerName - Partner name
     * @returns {Object} Sample collaboration
     */
    function generateSampleCollaboration(name, partnerName) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);
        
        return {
            id: generateId(),
            name: name || 'Sample Collaboration',
            partnerName: partnerName || 'Sample Partner',
            type: 'co-branding',
            description: 'This is a sample collaboration for demonstration purposes.',
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10),
            objectives: ['audience', 'content', 'credibility'],
            tasks: [
                {
                    id: generateId(),
                    title: 'Kick-off Meeting',
                    description: 'Initial project kick-off meeting with all stakeholders.',
                    assignedTo: 'Project Manager',
                    dueDate: startDate.toISOString().slice(0, 10),
                    status: 'completed',
                    priority: 'high',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                },
                {
                    id: generateId(),
                    title: 'Project Plan Development',
                    description: 'Create detailed project plan with milestones and deliverables.',
                    assignedTo: 'Project Manager',
                    dueDate: new Date(startDate.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                    status: 'in-progress',
                    priority: 'high',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                },
                {
                    id: generateId(),
                    title: 'Brand Guidelines Review',
                    description: 'Review and align on brand guidelines for the collaboration.',
                    assignedTo: 'Marketing Team',
                    dueDate: new Date(startDate.getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                    status: 'pending',
                    priority: 'medium',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                }
            ],
            milestones: [
                {
                    id: generateId(),
                    title: 'Project Initiation',
                    description: 'Completion of all project initiation activities.',
                    dueDate: new Date(startDate.getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                    status: 'pending',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                },
                {
                    id: generateId(),
                    title: 'Content Development',
                    description: 'Completion of all collaborative content development.',
                    dueDate: new Date(startDate.getTime() + (60 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                    status: 'pending',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                },
                {
                    id: generateId(),
                    title: 'Campaign Launch',
                    description: 'Official launch of the collaborative campaign.',
                    dueDate: new Date(startDate.getTime() + (90 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                    status: 'pending',
                    createdAt: startDate.toISOString(),
                    updatedAt: startDate.toISOString()
                }
            ],
            documents: [],
            notes: [],
            status: 'active',
            createdAt: startDate.toISOString(),
            updatedAt: startDate.toISOString()
        };
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
        createCollaboration,
        updateCollaboration,
        addTask,
        updateTask,
        deleteTask,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        addDocument,
        updateDocument,
        deleteDocument,
        addNote,
        updateNote,
        deleteNote,
        calculateProgress,
        generateSampleCollaboration
    };
})();