import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  SearchIcon, 
  FilterIcon, 
  EditIcon, 
  TrashIcon,
  PlusIcon,
  BriefcaseIcon,
  CalendarIcon,
  TrendingUpIcon
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample data
const candidaturas = [
  {
    id: 1,
    empresa: "Google",
    tipo: "Pleno",
    data: "2024-01-15",
    status: "Próxima fase"
  },
  {
    id: 2,
    empresa: "Microsoft",
    tipo: "Sênior",
    data: "2024-01-10",
    status: "Retorno positivo"
  },
  {
    id: 3,
    empresa: "Amazon",
    tipo: "Júnior",
    data: "2024-01-08",
    status: "Sem retorno"
  },
  {
    id: 4,
    empresa: "Meta",
    tipo: "Pleno",
    data: "2024-01-05",
    status: "Aprovado"
  },
  {
    id: 5,
    empresa: "Apple",
    tipo: "Sênior",
    data: "2024-01-03",
    status: "Reprovado"
  }
]

const statusMap = {
  "Inscrito": "status-inscrito",
  "Sem retorno": "status-sem-retorno", 
  "Retorno positivo": "status-retorno-positivo",
  "Retorno negativo": "status-retorno-negativo",
  "Próxima fase": "status-proxima-fase",
  "Reprovado": "status-reprovado",
  "Aprovado": "status-aprovado"
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const filteredCandidaturas = candidaturas.filter(candidatura =>
    candidatura.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: candidaturas.length,
    aprovado: candidaturas.filter(c => c.status === "Aprovado").length,
    pendente: candidaturas.filter(c => ["Inscrito", "Sem retorno", "Retorno positivo", "Próxima fase"].includes(c.status)).length,
    reprovado: candidaturas.filter(c => ["Reprovado", "Retorno negativo"].includes(c.status)).length,
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-surface border-b border-border p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Acompanhe suas candidaturas de emprego
                </p>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate("/candidatura")}
                className="self-start sm:self-auto"
              >
                <PlusIcon className="w-4 h-4" />
                Nova Candidatura
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <p className="text-xs text-muted-foreground">candidaturas</p>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{stats.aprovado}</div>
                <p className="text-xs text-muted-foreground">aprovações</p>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <CalendarIcon className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{stats.pendente}</div>
                <p className="text-xs text-muted-foreground">aguardando</p>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reprovadas</CardTitle>
                <TrashIcon className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.reprovado}</div>
                <p className="text-xs text-muted-foreground">rejeitadas</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Suas Candidaturas</CardTitle>
              <CardDescription>
                Gerencie e acompanhe o status de suas candidaturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 form-input"
                  />
                </div>
                <Button variant="outline" className="shrink-0">
                  <FilterIcon className="w-4 h-4" />
                  Filtros
                </Button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidaturas.map((candidatura) => (
                      <tr 
                        key={candidatura.id} 
                        className="border-b border-border/50 hover:bg-surface-hover transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{candidatura.empresa}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {candidatura.tipo}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(candidatura.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={`px-2 py-1 text-xs rounded-full ${statusMap[candidatura.status as keyof typeof statusMap]}`}
                          >
                            {candidatura.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCandidaturas.length === 0 && (
                <div className="text-center py-12">
                  <BriefcaseIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhuma candidatura encontrada
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando sua primeira candidatura"}
                  </p>
                  <Button variant="hero" onClick={() => navigate("/candidatura")}>
                    <PlusIcon className="w-4 h-4" />
                    Adicionar Candidatura
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}