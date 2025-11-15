export default function MapSection() {
  return (
    <section className="py-20 px-6" id="mapa">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-semibold text-center mb-4" data-testid="text-map-title">
          Mapa Wanka de Referentes
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubre la distribución geográfica de nuestras líderes en la región de Huancayo
        </p>

        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Provincia_de_Huancayo.png"
            alt="Mapa de la Provincia de Huancayo"
            className="w-full h-auto"
            data-testid="img-map"
          />
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Mapa ilustrativo de la Provincia de Huancayo, región Junín, Perú
        </p>
      </div>
    </section>
  );
}
