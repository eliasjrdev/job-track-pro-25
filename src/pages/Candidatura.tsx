import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, SaveIcon, ArrowLeftIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function Candidatura() {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    empresa: "",
    tipo: "",
    status: "",
    data: new Date()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.empresa || !formData.tipo || !formData.status) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Candidatura salva!",
      description: `Candidatura para ${formData.empresa} foi adicionada com sucesso.`,
    })
    
    // Reset form
    setFormData({
      empresa: "",
      tipo: "",
      status: "",
      data: new Date()
    })
    
    // Navigate back to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-surface border-b border-border p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="shrink-0"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Cadastrar Candidatura</h1>
                <p className="text-muted-foreground mt-1">
                  Adicione uma nova candidatura ao seu dashboard
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SaveIcon className="w-5 h-5 text-primary" />
                Nova Candidatura
              </CardTitle>
              <CardDescription>
                Preencha as informações da vaga para a qual você se candidatou
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Empresa */}
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-sm font-medium">
                      Empresa *
                    </Label>
                    <Input
                      id="empresa"
                      type="text"
                      placeholder="Ex: Google, Microsoft, Amazon..."
                      value={formData.empresa}
                      onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                      className="form-input"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Nome da empresa para qual você se candidatou
                    </p>
                  </div>

                  {/* Tipo da Vaga */}
                  <div className="space-y-2">
                    <Label htmlFor="tipo" className="text-sm font-medium">
                      Tipo da Vaga *
                    </Label>
                    <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Estágio">Estágio</SelectItem>
                        <SelectItem value="Júnior">Júnior</SelectItem>
                        <SelectItem value="Pleno">Pleno</SelectItem>
                        <SelectItem value="Sênior">Sênior</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Nível de senioridade da vaga
                    </p>
                  </div>

                  {/* Data de Inscrição */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Data de Inscrição
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "form-input justify-start text-left font-normal",
                            !formData.data && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.data ? (
                            format(formData.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.data}
                          onSelect={(date) => date && setFormData(prev => ({ ...prev, data: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">
                      Quando você se candidatou para a vaga
                    </p>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status Atual *
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inscrito">Inscrito</SelectItem>
                        <SelectItem value="Sem retorno">Sem retorno</SelectItem>
                        <SelectItem value="Retorno positivo">Retorno positivo</SelectItem>
                        <SelectItem value="Retorno negativo">Retorno negativo</SelectItem>
                        <SelectItem value="Próxima fase">Próxima fase</SelectItem>
                        <SelectItem value="Reprovado">Reprovado</SelectItem>
                        <SelectItem value="Aprovado">Aprovado</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Status atual do processo seletivo
                    </p>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="flex-1 sm:flex-initial"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Salvar Candidatura
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 sm:flex-initial"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="glass-card mt-6 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-lg">Dicas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                  <span>Mantenha sempre seus dados atualizados para um melhor acompanhamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                  <span>Use o status "Próxima fase" quando avançar no processo seletivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                  <span>Você pode editar as informações a qualquer momento pelo dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}