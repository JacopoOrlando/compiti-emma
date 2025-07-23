import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Brain, Zap } from "lucide-react";

interface ProgressData {
  subject: string;
  topic: string;
  level: string;
  exercise: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  attempts: number;
  completed: boolean;
  timestamp: number;
}

interface ProgressTrackerProps {
  currentSession?: {
    subject: string;
    topic: string;
    level: string;
    exercise: string;
    score: number;
    totalQuestions: number;
    timeSpent: number;
  };
}

export const ProgressTracker = ({ currentSession }: ProgressTrackerProps) => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem('educational-progress');
    if (stored) {
      setProgressData(JSON.parse(stored));
    }

    const storedAchievements = localStorage.getItem('educational-achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  useEffect(() => {
    if (currentSession) {
      const newProgress: ProgressData = {
        ...currentSession,
        attempts: 1,
        completed: currentSession.score >= currentSession.totalQuestions * 0.8,
        timestamp: Date.now()
      };

      // Check for existing session
      const existingIndex = progressData.findIndex(p => 
        p.subject === currentSession.subject && 
        p.topic === currentSession.topic && 
        p.level === currentSession.level && 
        p.exercise === currentSession.exercise
      );

      let updatedProgress;
      if (existingIndex >= 0) {
        updatedProgress = [...progressData];
        updatedProgress[existingIndex] = {
          ...updatedProgress[existingIndex],
          score: Math.max(updatedProgress[existingIndex].score, currentSession.score),
          attempts: updatedProgress[existingIndex].attempts + 1,
          timeSpent: updatedProgress[existingIndex].timeSpent + currentSession.timeSpent,
          completed: currentSession.score >= currentSession.totalQuestions * 0.8,
          timestamp: Date.now()
        };
      } else {
        updatedProgress = [...progressData, newProgress];
      }

      setProgressData(updatedProgress);
      localStorage.setItem('educational-progress', JSON.stringify(updatedProgress));

      // Check for new achievements
      checkAchievements(updatedProgress);
    }
  }, [currentSession]);

  const checkAchievements = (progress: ProgressData[]) => {
    const newAchievements = [...achievements];
    
    // Perfect score achievement
    if (currentSession?.score === currentSession?.totalQuestions && !achievements.includes('perfect-score')) {
      newAchievements.push('perfect-score');
    }

    // Speed demon achievement (completing in under 2 minutes)
    if (currentSession && currentSession.timeSpent < 120 && currentSession.score >= currentSession.totalQuestions * 0.8 && !achievements.includes('speed-demon')) {
      newAchievements.push('speed-demon');
    }

    // Subject master achievement (completing all topics in a subject)
    const mathTopics = progress.filter(p => p.subject === 'matematica' && p.completed).length;
    if (mathTopics >= 5 && !achievements.includes('math-master')) {
      newAchievements.push('math-master');
    }

    // Persistent learner (10 completed exercises)
    const completedCount = progress.filter(p => p.completed).length;
    if (completedCount >= 10 && !achievements.includes('persistent-learner')) {
      newAchievements.push('persistent-learner');
    }

    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements);
      localStorage.setItem('educational-achievements', JSON.stringify(newAchievements));
    }
  };

  const getAchievementInfo = (achievement: string) => {
    const achievementMap = {
      'perfect-score': { icon: Trophy, title: 'Punteggio Perfetto!', description: 'Hai ottenuto il massimo punteggio', color: 'text-fun-yellow' },
      'speed-demon': { icon: Zap, title: 'Velocista!', description: 'Completato in meno di 2 minuti', color: 'text-fun-orange' },
      'math-master': { icon: Target, title: 'Maestro di Matematica!', description: 'Hai padroneggiato la matematica', color: 'text-fun-blue' },
      'persistent-learner': { icon: Brain, title: 'Studente Perseverante!', description: 'Hai completato 10 esercizi', color: 'text-fun-purple' }
    };
    return achievementMap[achievement as keyof typeof achievementMap];
  };

  const totalCompleted = progressData.filter(p => p.completed).length;
  const totalAttempted = progressData.length;
  const averageScore = progressData.length > 0 
    ? progressData.reduce((sum, p) => sum + (p.score / p.totalQuestions), 0) / progressData.length * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 border-4 border-primary/20 shadow-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Il Tuo Progresso</h3>
            <p className="text-muted-foreground">Continua così, stai andando benissimo!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-fun-green">{totalCompleted}</div>
            <div className="text-sm text-muted-foreground">Esercizi Completati</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fun-blue">{Math.round(averageScore)}%</div>
            <div className="text-sm text-muted-foreground">Punteggio Medio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fun-purple">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Traguardi Raggiunti</div>
          </div>
        </div>

        <Progress value={(totalCompleted / Math.max(totalAttempted, 1)) * 100} className="h-3" />
      </Card>

      {/* Achievements */}
      {achievements.length > 0 && (
        <Card className="p-6 border-4 border-fun-yellow/30 shadow-card">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-fun-yellow" />
            I Tuoi Traguardi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const info = getAchievementInfo(achievement);
              if (!info) return null;
              
              return (
                <div key={achievement} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-fade-in">
                  <info.icon className={`w-8 h-8 ${info.color}`} />
                  <div>
                    <div className="font-bold">{info.title}</div>
                    <div className="text-sm text-muted-foreground">{info.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      {progressData.length > 0 && (
        <Card className="p-6 border-4 border-secondary/20 shadow-card">
          <h3 className="text-xl font-bold text-foreground mb-4">Attività Recente</h3>
          <div className="space-y-3">
            {progressData
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 5)
              .map((progress, index) => (
                <div key={`progress-${progress.timestamp}-${index}`} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium capitalize">
                      {progress.subject} • {progress.topic.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Livello {progress.level.replace('livello', '')} • {progress.exercise.replace('-', ' ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={progress.completed ? "default" : "secondary"}>
                      {progress.score}/{progress.totalQuestions}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(progress.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressTracker;