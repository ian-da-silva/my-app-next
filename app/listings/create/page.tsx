"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Upload, X, Star, MapPin, Camera, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---------- Types ----------
interface ShippingOptions {
  pickup: boolean;
  buyerPays: boolean;
  freeShipping: boolean;
}

interface PhotoItem {
  file: File;
  url: string;
  isCover?: boolean;
}

// Mock options for the BG autocomplete (replace with real API)
const MOCK_GAMES = [
  { id: 1, name: "Catan (1995)" },
  { id: 2, name: "Ticket to Ride (2004)" },
  { id: 3, name: "Azul (2017)" },
  { id: 4, name: "Gloomhaven (2017)" },
  { id: 5, name: "Clank! (2016)" },
];

// ---------- Component ----------
export default function CreateListingForm() {
  const [title, setTitle] = useState("");
  const [gameQuery, setGameQuery] = useState("");
  const [bgId, setBgId] = useState<number | null>(null);
  const [condition, setCondition] = useState<string>("Como novo");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [shipping, setShipping] = useState<ShippingOptions>({ pickup: true, buyerPays: true, freeShipping: false });
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [visible, setVisible] = useState<boolean>(false); // draft by default
  const [autoSavedAt, setAutoSavedAt] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ------- Derived data -------
  const coverUrl = useMemo(() => photos.find(p => p.isCover)?.url || photos[0]?.url, [photos]);
  const gameSelected = useMemo(() => MOCK_GAMES.find(g => g.id === bgId)?.name, [bgId]);

  // ------- Autosave (mock) -------
  useEffect(() => {
    const id = setTimeout(() => {
      // Put your real draft API call here
      setAutoSavedAt(new Date().toLocaleTimeString());
    }, 800);
    return () => clearTimeout(id);
  }, [title, bgId, condition, description, price, quantity, negotiable, shipping, photos, visible]);

  // ------- Handlers -------
  function handlePhotos(files: FileList | null) {
    if (!files) return;
    const next: PhotoItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos(prev => {
      const merged = [...prev, ...next].slice(0, 5); // limit 5
      if (!merged.some(p => p.isCover) && merged[0]) merged[0].isCover = true;
      return [...merged];
    });
  }

  function setAsCover(idx: number) {
    setPhotos(prev => prev.map((p, i) => ({ ...p, isCover: i === idx })));
  }

  function removePhoto(idx: number) {
    setPhotos(prev => {
      const copy = prev.filter((_, i) => i !== idx);
      if (!copy.some(p => p.isCover) && copy[0]) copy[0].isCover = true;
      return copy;
    });
  }

  function toggleShip(key: keyof ShippingOptions) {
    setShipping(s => ({ ...s, [key]: !s[key] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simple validation
    const errors: string[] = [];
    if (!title.trim()) errors.push("Título é obrigatório");
    if (!bgId) errors.push("Selecione um jogo do banco de dados");
    if (!price || Number(price) <= 0) errors.push("Preço deve ser maior que 0");
    if (photos.length === 0) errors.push("Adicione pelo menos 1 foto");

    if (errors.length) {
      alert("Corrija os seguintes campos:\n- " + errors.join("\n- "));
      return;
    }

    const payload = {
      title,
      bg_id: bgId,
      condition,
      description,
      price: Number(price),
      quantity,
      negotiable,
      shippingOptions: shipping,
      visibility: visible ? "public" : "draft",
      // photos will be handled via multipart/form-data in real impl
    };

    console.log("CREATE LISTING:", payload);
    alert("Mock enviado! Veja o console para o payload.");
  }

  const filteredGames = useMemo(() => {
    if (!gameQuery) return MOCK_GAMES;
    const q = gameQuery.toLowerCase();
    return MOCK_GAMES.filter(g => g.name.toLowerCase().includes(q));
  }, [gameQuery]);

  // ---------- UI ----------
  return (
    <div className="container mx-auto max-w-7xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Criar anúncio</h1>
          <p className="text-sm text-muted-foreground">Preencha os detalhes do seu jogo para publicar na MercadoBG.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Rascunho salvo:</span>
            <span>{autoSavedAt || "–"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="visibility" checked={visible} onCheckedChange={setVisible} />
            <Label htmlFor="visibility" className="cursor-pointer select-none text-sm flex items-center gap-1">
              {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} {visible ? "Público" : "Rascunho"}
            </Label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left column */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Informações básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input id="title" placeholder="Ex.: Catan: Edição Revisada" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Jogo *</Label>
                <div className="relative">
                  <Input
                    placeholder="Busque pelo jogo (banco de dados)"
                    value={gameQuery}
                    onChange={e => setGameQuery(e.target.value)}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Results */}
                <div className="mt-2 max-h-44 overflow-auto rounded-xl border bg-background">
                  {filteredGames.length === 0 && (
                    <div className="p-3 text-sm text-muted-foreground">Nenhum jogo encontrado. <button className="underline">Sugerir novo</button></div>
                  )}
                  {filteredGames.map(g => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => { setBgId(g.id); setGameQuery(g.name); }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted ${bgId === g.id ? "bg-muted" : ""}`}
                    >
                      <span className="text-sm">{g.name}</span>
                      {bgId === g.id && <span className="text-xs">Selecionado</span>}
                    </button>
                  ))}
                </div>
                {bgId && (
                  <p className="text-xs text-muted-foreground">Selecionado: {gameSelected}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Condição *</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Como novo">Como novo</SelectItem>
                      <SelectItem value="Bom">Bom</SelectItem>
                      <SelectItem value="Aceitável">Aceitável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input id="quantity" type="number" min={1} value={quantity}
                         onChange={e => setQuantity(Math.max(1, Number(e.target.value || 1)))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" rows={5} placeholder="Inclua observações, brindes, sleeves, estado das cartas, etc."
                          value={description} onChange={e => setDescription(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Preço & Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input id="price" inputMode="decimal" placeholder="Ex.: 249,90" value={price}
                         onChange={e => setPrice(e.target.value.replace(/[^0-9.,]/g, ""))} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch id="negotiable" checked={negotiable} onCheckedChange={setNegotiable} />
                  <Label htmlFor="negotiable">Aceita ofertas</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="flex items-center gap-3 rounded-xl border p-3">
                  <input type="checkbox" className="h-4 w-4" checked={shipping.pickup} onChange={() => toggleShip("pickup")} />
                  <span className="text-sm">Retirada em mãos</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border p-3">
                  <input type="checkbox" className="h-4 w-4" checked={shipping.buyerPays} onChange={() => toggleShip("buyerPays")} />
                  <span className="text-sm">Frete por conta do comprador</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border p-3">
                  <input type="checkbox" className="h-4 w-4" checked={shipping.freeShipping} onChange={() => toggleShip("freeShipping")} />
                  <span className="text-sm">Frete grátis</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => window.history.back()}>Cancelar</Button>
            <Button className="btn btn-primary" type="submit">Criar anúncio</Button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Fotos (até 5)</CardTitle>
              <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Carregar
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={e => handlePhotos(e.target.files)}
              />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {photos.map((p, idx) => (
                  <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`photo-${idx}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/40 p-2 group-hover:flex">
                      <Button type="button" size="sm" variant="secondary" onClick={() => setAsCover(idx)}>Capa</Button>
                      <Button type="button" size="sm" variant="destructive" onClick={() => removePhoto(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {p.isCover && (
                      <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-0.5 text-xs shadow">Capa</span>
                    )}
                  </div>
                ))}
                {photos.length === 0 && (
                  <div className="col-span-3">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                      <Camera className="mb-2 h-6 w-6" />
                      Arraste e solte imagens aqui, ou clique em <span className="font-medium">Carregar</span>.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Pré-visualização</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border overflow-hidden">
                <div className="relative h-48 w-full">
                  {coverUrl ? (
                    <Image src={coverUrl} alt={title || "cover"} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <Camera className="h-6 w-6" />
                    </div>
                  )}
                  {/* Rating badge placeholder */}
                  <div className="absolute left-2 top-2 rounded-xl bg-black/75 px-2 py-1 text-xs text-white flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" /> 8.2
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="line-clamp-1 text-base font-medium">{title || "Título do anúncio"}</h3>
                      <p className="text-xs text-muted-foreground">{gameSelected || "Selecione o jogo"}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> São Leopoldo, RS
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{price ? `R$ ${price}` : "R$ 0,00"}</div>
                      <div className="text-xs text-muted-foreground">{condition}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
