/**
 * Roadmap Interactive Features
 * Handles progress tracking, phase navigation, and interactive elements
 */

class HadoopRoadmap {
    constructor() {
        this.currentPhase = 1;
        this.completedPhases = this.loadProgress();
        this.init();
    }

    init() {
        this.setupPhaseNavigation();
        this.setupProgressTracking();
        this.setupExerciseToggles();
        this.updateProgressDisplay();
        this.setupPhaseCompletion();
        this.addProgressAnimations();
    }

    /**
     * Setup phase navigation and highlighting
     */
    setupPhaseNavigation() {
        const phases = document.querySelectorAll('.roadmap-phase');
        
        phases.forEach((phase, index) => {
            const phaseNumber = index + 1;
            const card = phase.querySelector('.roadmap-card');
            
            // Add click handler for phase selection
            card.addEventListener('click', () => {
                this.selectPhase(phaseNumber);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                this.highlightPhase(phaseNumber);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHighlight(phaseNumber);
            });
        });
    }

    /**
     * Setup progress tracking functionality
     */
    setupProgressTracking() {
        // Create progress indicators for each phase
        const phases = document.querySelectorAll('.roadmap-phase');
        
        phases.forEach((phase, index) => {
            const phaseNumber = index + 1;
            const header = phase.querySelector('.card-header');
            
            // Add progress indicator
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'progress-indicator';
            progressIndicator.innerHTML = this.getProgressIndicatorHTML(phaseNumber);
            header.appendChild(progressIndicator);
        });
    }

    /**
     * Setup exercise toggle functionality
     */
    setupExerciseToggles() {
        const exerciseButtons = document.querySelectorAll('[href^="#exercises-"]');
        
        exerciseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const isVisible = target.classList.contains('show');
                    
                    // Close all other exercise sections
                    document.querySelectorAll('[id^="exercises-"]').forEach(section => {
                        section.classList.remove('show');
                    });
                    
                    // Toggle current section
                    if (!isVisible) {
                        target.classList.add('show');
                        button.innerHTML = '💻 Ocultar Exercícios';
                        this.trackExerciseView(targetId);
                    } else {
                        button.innerHTML = '💻 Exercícios Práticos';
                    }
                }
            });
        });
    }

    /**
     * Setup phase completion tracking
     */
    setupPhaseCompletion() {
        const phases = document.querySelectorAll('.roadmap-phase');
        
        phases.forEach((phase, index) => {
            const phaseNumber = index + 1;
            const card = phase.querySelector('.roadmap-card');
            
            // Add completion button
            const completionButton = document.createElement('button');
            completionButton.className = 'btn btn-outline-success btn-sm mt-2';
            completionButton.innerHTML = this.getCompletionButtonText(phaseNumber);
            completionButton.addEventListener('click', () => {
                this.togglePhaseCompletion(phaseNumber);
            });
            
            const cardBody = card.querySelector('.card-body');
            cardBody.appendChild(completionButton);
        });
    }

    /**
     * Select and highlight a specific phase
     */
    selectPhase(phaseNumber) {
        // Remove previous selections
        document.querySelectorAll('.roadmap-phase').forEach(phase => {
            phase.classList.remove('selected');
        });
        
        // Add selection to current phase
        const selectedPhase = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (selectedPhase) {
            selectedPhase.classList.add('selected');
            this.currentPhase = phaseNumber;
            
            // Scroll to phase
            selectedPhase.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    /**
     * Highlight phase on hover
     */
    highlightPhase(phaseNumber) {
        const phase = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (phase) {
            phase.classList.add('highlighted');
        }
    }

    /**
     * Remove highlight from phase
     */
    removeHighlight(phaseNumber) {
        const phase = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (phase) {
            phase.classList.remove('highlighted');
        }
    }

    /**
     * Toggle phase completion status
     */
    togglePhaseCompletion(phaseNumber) {
        const isCompleted = this.completedPhases.includes(phaseNumber);
        
        if (isCompleted) {
            this.completedPhases = this.completedPhases.filter(p => p !== phaseNumber);
        } else {
            this.completedPhases.push(phaseNumber);
        }
        
        this.saveProgress();
        this.updateProgressDisplay();
        this.updatePhaseAppearance(phaseNumber);
        
        // Show completion animation
        if (!isCompleted) {
            this.showCompletionAnimation(phaseNumber);
        }
    }

    /**
     * Update progress display
     */
    updateProgressDisplay() {
        const totalPhases = 6;
        const completedCount = this.completedPhases.length;
        const progressPercentage = (completedCount / totalPhases) * 100;
        
        // Update overview stats
        const overviewStats = document.querySelectorAll('.roadmap-stat h4');
        if (overviewStats.length > 0) {
            // Update completed phases count if we add this stat
            const completedStat = document.querySelector('.completed-phases-stat');
            if (completedStat) {
                completedStat.textContent = `${completedCount}/${totalPhases}`;
            }
        }
        
        // Update phase appearances
        for (let i = 1; i <= totalPhases; i++) {
            this.updatePhaseAppearance(i);
        }
    }

    /**
     * Update individual phase appearance based on completion status
     */
    updatePhaseAppearance(phaseNumber) {
        const phase = document.querySelector(`[data-phase="${phaseNumber}"]`);
        const isCompleted = this.completedPhases.includes(phaseNumber);
        
        if (phase) {
            const card = phase.querySelector('.roadmap-card');
            const phaseNumberBadge = phase.querySelector('.phase-number .badge');
            
            if (isCompleted) {
                card.classList.add('completed');
                phaseNumberBadge.innerHTML = '✅';
                phaseNumberBadge.classList.remove('bg-success');
                phaseNumberBadge.classList.add('bg-success');
            } else {
                card.classList.remove('completed');
                phaseNumberBadge.innerHTML = phaseNumber;
                phaseNumberBadge.classList.remove('bg-success');
                phaseNumberBadge.classList.add('bg-success');
            }
        }
    }

    /**
     * Get progress indicator HTML
     */
    getProgressIndicatorHTML(phaseNumber) {
        const isCompleted = this.completedPhases.includes(phaseNumber);
        const status = isCompleted ? 'Concluída' : 'Pendente';
        const iconClass = isCompleted ? 'fas fa-check-circle text-success' : 'far fa-circle text-warning';
        
        return `
            <div class="phase-status">
                <i class="${iconClass}"></i>
                <small class="ms-1">${status}</small>
            </div>
        `;
    }

    /**
     * Get completion button text
     */
    getCompletionButtonText(phaseNumber) {
        const isCompleted = this.completedPhases.includes(phaseNumber);
        return isCompleted ? '✅ Marcar como Pendente' : '✅ Marcar como Concluída';
    }

    /**
     * Show completion animation
     */
    showCompletionAnimation(phaseNumber) {
        const phase = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (phase) {
            // Add completion effect
            phase.classList.add('completion-animation');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                phase.classList.remove('completion-animation');
            }, 1000);
            
            // Show success message
            this.showSuccessMessage(`Fase ${phaseNumber} concluída! 🎉`);
        }
    }

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification success';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    /**
     * Add progress animations
     */
    addProgressAnimations() {
        // Animate phase cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.roadmap-phase').forEach(phase => {
            observer.observe(phase);
        });
    }

    /**
     * Track exercise view for analytics
     */
    trackExerciseView(exerciseId) {
        // Analytics tracking could be implemented here
        console.log(`Exercise section viewed: ${exerciseId}`);
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        const saved = localStorage.getItem('hadoop-roadmap-progress');
        return saved ? JSON.parse(saved) : [];
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        localStorage.setItem('hadoop-roadmap-progress', JSON.stringify(this.completedPhases));
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            this.completedPhases = [];
            this.saveProgress();
            this.updateProgressDisplay();
            this.showSuccessMessage('Progresso resetado com sucesso!');
        }
    }

    /**
     * Export progress as JSON
     */
    exportProgress() {
        const progressData = {
            completedPhases: this.completedPhases,
            exportDate: new Date().toISOString(),
            totalPhases: 6
        };
        
        const dataStr = JSON.stringify(progressData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'hadoop-roadmap-progress.json';
        link.click();
    }

    /**
     * Get completion statistics
     */
    getCompletionStats() {
        const totalPhases = 6;
        const completedCount = this.completedPhases.length;
        const progressPercentage = Math.round((completedCount / totalPhases) * 100);
        
        return {
            totalPhases,
            completedPhases: completedCount,
            remainingPhases: totalPhases - completedCount,
            progressPercentage,
            isComplete: completedCount === totalPhases
        };
    }
}

// Initialize roadmap when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hadoopRoadmap = new HadoopRoadmap();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    window.hadoopRoadmap.resetProgress();
                    break;
                case 'e':
                    e.preventDefault();
                    window.hadoopRoadmap.exportProgress();
                    break;
            }
        }
    });
});

// Utility functions for external use
window.RoadmapUtils = {
    /**
     * Jump to specific phase
     */
    goToPhase: (phaseNumber) => {
        if (window.hadoopRoadmap) {
            window.hadoopRoadmap.selectPhase(phaseNumber);
        }
    },
    
    /**
     * Get current progress
     */
    getProgress: () => {
        if (window.hadoopRoadmap) {
            return window.hadoopRoadmap.getCompletionStats();
        }
        return null;
    },
    
    /**
     * Mark phase as completed
     */
    completePhase: (phaseNumber) => {
        if (window.hadoopRoadmap && !window.hadoopRoadmap.completedPhases.includes(phaseNumber)) {
            window.hadoopRoadmap.togglePhaseCompletion(phaseNumber);
        }
    }
};