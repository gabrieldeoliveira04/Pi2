import { Badge, UserBadge } from "@/types";
import { Award, Star, Trophy, Target, BookOpen, Clock } from "lucide-react";

interface BadgeDisplayProps {
  badge: Badge;
  earned?: boolean;
  earnedAt?: string;
}

const badgeIcons = {
  award: Award,
  star: Star,
  trophy: Trophy,
  target: Target,
  book: BookOpen,
  clock: Clock
};

export const BadgeDisplay = ({ badge, earned = false, earnedAt }: BadgeDisplayProps) => {
  const IconComponent = badgeIcons[badge.icon as keyof typeof badgeIcons] || Award;
  
  return (
    <div className={`badge-card p-4 rounded-lg border transition-all ${
      earned 
        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-md' 
        : 'bg-muted/50 border-muted grayscale opacity-60'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          earned 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
            : 'bg-muted text-muted-foreground'
        }`}>
          <IconComponent className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
            {badge.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {badge.description}
          </p>
          {earned && earnedAt && (
            <p className="text-xs text-success mt-1">
              Conquistado em {new Date(earnedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};