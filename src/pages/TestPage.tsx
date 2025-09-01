import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Award,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: "multiple" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

interface TestData {
  id: string;
  title: string;
  type: "pre" | "post";
  timeLimit: number;
  totalPoints: number;
  questions: Question[];
}

const mockTest: TestData = {
  id: "test-1",
  title: "Avaliação: React Hooks",
  type: "pre",
  timeLimit: 30,
  totalPoints: 100,
  questions: [
    {
      id: "q1",
      type: "multiple",
      question: "Qual hook é usado para gerenciar estado local em componentes funcionais?",
      options: [
        "useEffect",
        "useState", 
        "useContext",
        "useReducer"
      ],
      correctAnswer: "useState",
      points: 20
    },
    {
      id: "q2", 
      type: "multiple",
      question: "Para que serve o useEffect?",
      options: [
        "Apenas para fazer requests HTTP",
        "Para gerenciar estado",
        "Para executar efeitos colaterais",
        "Para criar contextos"
      ],
      correctAnswer: "Para executar efeitos colaterais",
      points: 20
    },
    {
      id: "q3",
      type: "essay",
      question: "Explique a diferença entre useState e useReducer. Quando você usaria cada um?",
      points: 30
    },
    {
      id: "q4",
      type: "multiple",
      question: "Qual é a forma correta de usar useEffect para fazer cleanup?",
      options: [
        "useEffect(() => { cleanup(); })",
        "useEffect(() => { return cleanup; })",
        "useEffect(() => { return () => cleanup(); })",
        "useEffect(cleanup)"
      ],
      correctAnswer: "useEffect(() => { return () => cleanup(); })",
      points: 15
    },
    {
      id: "q5",
      type: "essay", 
      question: "Descreva um cenário onde você criaria um custom hook. Forneça um exemplo prático.",
      points: 15
    }
  ]
};

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitTest = () => {
    // Calculate score for multiple choice questions
    let totalScore = 0;
    let maxScore = 0;
    
    mockTest.questions.forEach(question => {
      maxScore += question.points;
      if (question.type === "multiple" && answers[question.id] === question.correctAnswer) {
        totalScore += question.points;
      }
      // Essay questions would need manual grading
    });

    setScore(totalScore);
    setIsSubmitted(true);
    
    toast({
      title: "Teste enviado com sucesso! 📝",
      description: `Você obteve ${totalScore} de ${maxScore} pontos nas questões objetivas.`,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestion + 1) / mockTest.questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  if (isSubmitted && score !== null) {
    return (
      <div className="min-h-screen bg-background">
        <Header userType="student" userName="Ana Silva" />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-success" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Teste Concluído!</h1>
              
              <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {score} / {mockTest.totalPoints}
                </div>
                <p className="text-muted-foreground">
                  Pontuação obtida (questões objetivas)
                </p>
              </div>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex justify-between items-center">
                  <span>Questões respondidas:</span>
                  <Badge variant="secondary">{answeredQuestions}/{mockTest.questions.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tipo de avaliação:</span>
                  <Badge variant={mockTest.type === "pre" ? "destructive" : "default"}>
                    {mockTest.type === "pre" ? "Pré-teste" : "Pós-teste"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tempo utilizado:</span>
                  <span className="font-medium">{formatTime(mockTest.timeLimit * 60 - timeLeft)}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                As questões dissertativas serão avaliadas pelo instrutor e a nota final será disponibilizada em breve.
              </p>

              <div className="flex gap-3 justify-center">
                <Button variant="outline">
                  Ver Respostas
                </Button>
                <Button className="btn-gradient">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refazer Teste
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = mockTest.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header userType="student" userName="Ana Silva" />
      
      {/* Test Header */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold">{mockTest.title}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant={mockTest.type === "pre" ? "destructive" : "default"}>
                    {mockTest.type === "pre" ? "Pré-teste" : "Pós-teste"}
                  </Badge>
                  <span>•</span>
                  <span>{mockTest.questions.length} questões</span>
                  <span>•</span>
                  <span>{mockTest.totalPoints} pontos</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 300 ? 'text-destructive' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              {timeLeft < 300 && (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">
                Questão {currentQuestion + 1} de {mockTest.questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {answeredQuestions} respondidas
              </span>
            </div>
            <ProgressBar value={progressPercentage} showPercentage={false} />
          </div>

          {/* Question */}
          <Card className="p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold flex-1 mr-4">
                {currentQ.question}
              </h2>
              <Badge variant="outline">
                {currentQ.points} pts
              </Badge>
            </div>

            {currentQ.type === "multiple" && currentQ.options && (
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                className="space-y-4"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="text-base leading-relaxed cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "essay" && (
              <div className="space-y-3">
                <Label htmlFor="essay-answer" className="text-base">
                  Sua resposta:
                </Label>
                <Textarea
                  id="essay-answer"
                  placeholder="Digite sua resposta aqui... (mínimo 100 caracteres)"
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="text-sm text-muted-foreground text-right">
                  {(answers[currentQ.id] || "").length} caracteres
                </div>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {answers[currentQ.id] && (
                <CheckCircle className="h-5 w-5 text-success" />
              )}
              <span className="text-sm text-muted-foreground">
                Questão {currentQuestion + 1}/{mockTest.questions.length}
              </span>
            </div>

            {currentQuestion === mockTest.questions.length - 1 ? (
              <Button
                className="btn-gradient"
                onClick={handleSubmitTest}
                disabled={answeredQuestions === 0}
              >
                Finalizar Teste
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === mockTest.questions.length - 1}
              >
                Próxima
              </Button>
            )}
          </div>

          {/* Question Overview */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-3">Visão Geral das Questões</h3>
            <div className="grid grid-cols-5 gap-2">
              {mockTest.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? "bg-primary text-primary-foreground border-primary"
                      : answers[mockTest.questions[index].id]
                      ? "bg-success/10 text-success border-success"
                      : "bg-background border-border hover:bg-accent"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}