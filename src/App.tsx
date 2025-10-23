import { useMemo, useState } from 'react'
import { GAME_SET, TOTAL } from './data/games'

// ---------- Utilidades ----------
const pad2 = (n: number) => n.toString().padStart(2, '0')

function normalizeSixNumbers(input: string): string | null {
  const nums = (input.match(/\d{1,2}/g) || [])
    .map((t) => parseInt(t, 10))
    .filter((n) => n >= 1 && n <= 60)

  if (nums.length !== 6) return null
  const sorted = [...nums].sort((a, b) => a - b)
  const hasDup = new Set(sorted).size !== sorted.length
  if (hasDup) return null
  return sorted.map(pad2).join('-')
}

export default function App() {
  const [query, setQuery] = useState<string>('')
  const [result, setResult] = useState<'none' | 'hit' | 'miss'>('none')
  const [hint, setHint] = useState<string>('')

  const normalizedQuery = useMemo(() => normalizeSixNumbers(query) ?? '', [query])

  function check() {
    setResult('none')
    setHint('')
    const key = normalizeSixNumbers(query)
    if (!key) {
      setHint('Digite exatamente 6 números entre 1 e 60 (sem repetição). Ex: 1 5 13 24 44 60')
      return
    }
    setResult(GAME_SET.has(key) ? 'hit' : 'miss')
  }

  function clearAll() {
    setQuery('')
    setResult('none')
    setHint('')
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <header className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Verificador de Jogos da Mega-Sena</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Sabia que os jogos da Mega Sena não se repetem?
                {/* <strong>{TOTAL.toLocaleString()}</strong>. */}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Teste aqui o seu jogo para saber se ele já foi sorteado alguma vez.
              </p>
            </div>
          </header>

          <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
            <label className="block text-sm text-gray-700 mb-2">Digite seu jogo (6 números entre 1 e 60, sem repetição):</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: 1 5 13 24 44 60"
                className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-gray-900/20"
              />
              <div className="flex gap-3">
                <button onClick={check} className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:opacity-90 active:scale-[0.99] transition">Verificar</button>
                <button onClick={clearAll} className="px-5 py-3 rounded-xl border hover:bg-white active:scale-[0.99] transition">Limpar</button>
              </div>
            </div>
            {hint && <p className="text-sm text-amber-700 mt-2">{hint}</p>}

            {result !== 'none' && (
              <div className={`mt-4 rounded-xl p-4 ${result === 'hit' ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                <p className="text-sm text-gray-700">Consulta:</p>
                <p className="font-mono text-lg font-semibold mt-1">{normalizedQuery || '—'}</p>
                {result === 'hit' ? (
                  <p className="mt-2 text-rose-700 font-medium">❌ Esses números já foram sorteados antes.</p>
                ) : (
                  <p className="mt-2 text-emerald-700 font-medium">✅ Não encontrado, você pode ser o próximo ganhador!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
