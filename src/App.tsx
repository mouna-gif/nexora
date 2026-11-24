import { useMemo, useState } from "react"
import {
  ArrowLeft,
  Bell,
  Box,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Clock3,
  Heart,
  Home,
  FileText,
  LayoutGrid,
  MapPin,
  Minus,
  PackageCheck,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { products, orders, stockAlerts } from "./data/mockData"
import {
  AuthPrompt,
  EntryExperience,
  type EntryScreen,
} from "./components/EntryExperience"
import { useAppStore } from "./store/useAppStore"
import type { Product, UserRole } from "./types"

type CustomerTab = "home" | "catalogue" | "cart" | "checkout" | "orders" | "profile"
type EmployeeTab = "dashboard" | "orders" | "stock" | "deliveries" | "profile"

const money = (value: number) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 3,
  }).format(value)

function IconButton({
  icon: Icon,
  label,
  badge,
  onClick,
}: {
  icon: LucideIcon
  label: string
  badge?: number
  onClick?: () => void
}) {
  return (
    <button className="icon-button" aria-label={label} onClick={onClick}>
      <Icon size={20} strokeWidth={1.9} />
      {badge ? <span className="icon-badge">{badge}</span> : null}
    </button>
  )
}

function Header({
  title,
  eyebrow,
  back,
  onBack,
}: {
  title: string
  eyebrow?: string
  back?: boolean
  onBack?: () => void
}) {
  return (
    <header className="page-header">
      <div className="header-copy">
        {back ? (
          <IconButton icon={ArrowLeft} label="Retour" onClick={onBack} />
        ) : (
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
          </div>
        )}
        {back && <h1>{title}</h1>}
      </div>
      {!back && (
        <div className="header-actions">
          <IconButton icon={Bell} label="Notifications" badge={3} />
        </div>
      )}
    </header>
  )
}

function SearchBar({
  placeholder = "Rechercher un produit, une référence…",
}: {
  placeholder?: string
}) {
  return (
    <label className="search-bar">
      <Search size={19} />
      <input aria-label={placeholder} placeholder={placeholder} />
      <button aria-label="Filtres">
        <SlidersHorizontal size={18} />
      </button>
    </label>
  )
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product
  onOpen: () => void
}) {
  return (
    <article className="product-card" onClick={onOpen}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button className="heart" aria-label="Ajouter aux favoris">
          <Heart size={17} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-brand">
          {product.brand} · {product.sku}
        </span>
        <h3>{product.name}</h3>
        <div className="product-footer">
          <div>
            <strong>{money(product.price)}</strong>
            <small> / {product.unit}</small>
          </div>
          <span className={product.inStock ? "stock in" : "stock"}>
            {product.inStock ? "En stock" : "Sur commande"}
          </span>
        </div>
      </div>
    </article>
  )
}

function SectionTitle({ title, action }: { title: string action?: string }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button>
          {action} <ChevronRight size={15} />
        </button>
      )}
    </div>
  )
}

function CustomerHome({
  openProduct,
  goTo,
}: {
  openProduct: (p: Product) => void
  goTo: (t: CustomerTab) => void
}) {
  const cartCount = useAppStore((s) =>
    s.cart.reduce((sum, item) => sum + item.quantity, 0),
  )
  const isGuest = useAppStore((s) => s.session === "guest")
  return (
    <>
      <header className="home-header">
        <div className="brand-mark">
          <span>N</span>
        </div>
        <div className="welcome">
          <span>{isGuest ? "Bienvenue chez NEXORA" : "Bonjour, Amira"}</span>
          <strong>Un projet en tête ?</strong>
        </div>
        <IconButton icon={Bell} label="Notifications" badge={3} />
        <IconButton
          icon={ShoppingBag}
          label="Panier"
          badge={cartCount}
          onClick={() => goTo("cart")}
        />
      </header>
      <main>
        <SearchBar />
        <section className="hero">
          <img
            src="https://images.unsplash.com/photo-1728486885790-1454260d9246?auto=format&fit=crop&w=1200&q=85"
            alt="Salle de bain contemporaine en pierre"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-tag">COLLECTION 2026</span>
            <h2>
              L’élégance jusque
              <br />
              dans les détails.
            </h2>
            <p>Jusqu’à −25% sur une sélection salle de bain.</p>
            <button onClick={() => goTo("catalogue")}>
              Découvrir <ChevronRight size={17} />
            </button>
          </div>
          <div className="hero-dots">
            <i />
            <i className="active" />
            <i />
          </div>
        </section>

        <section className="section">
          <SectionTitle title="Explorer nos univers" action="Tout voir" />
          <div className="category-row">
            {[
              [
                "Carrelage",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
              ],
              [
                "Sanitaire",
                "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=300&q=80",
              ],
              [
                "Robinetterie",
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
              ],
              [
                "Douches",
                "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=300&q=80",
              ],
            ].map(([name, image]) => (
              <button
                className="category"
                key={name}
                onClick={() => goTo("catalogue")}
              >
                <img src={image} alt="" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionTitle title="Nos incontournables" action="Tout voir" />
          <div className="product-row">
            {products.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={() => openProduct(p)}
              />
            ))}
          </div>
        </section>

        <section className="inspiration">
          <div>
            <Sparkles size={20} />
            <span>INSPIRATION</span>
            <h2>Composez un espace qui vous ressemble.</h2>
          </div>
          <img
            src="https://images.unsplash.com/photo-1610178167104-488495443e01?auto=format&fit=crop&w=900&q=80"
            alt="Inspiration salle de bain"
          />
        </section>

        <section className="section">
          <SectionTitle title="Nouveautés" action="Voir la collection" />
          <div className="product-row">
            {products.slice(2).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={() => openProduct(p)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function Catalogue({ openProduct }: { openProduct: (p: Product) => void }) {
  const [filter, setFilter] = useState("Tout")
  const filtered = useMemo(
    () =>
      filter === "Tout"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  )
  return (
    <>
      <Header title="Catalogue" eyebrow="8 univers · 1 284 produits" />
      <main>
        <SearchBar />
        <div className="filter-row">
          {["Tout", "Carrelage", "Sanitaire", "Robinetterie"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="results-meta">
          <span>{filtered.length} produits</span>
          <button>
            Trier par <strong>Pertinence</strong>
          </button>
        </div>
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => openProduct(p)} />
          ))}
        </div>
      </main>
    </>
  )
}

function ProductDetail({
  product,
  onBack,
}: {
  product: Product
  onBack: () => void
}) {
  const [qty, setQty] = useState(1)
  const addToCart = useAppStore((s) => s.addToCart)
  const [added, setAdded] = useState(false)
  const add = () => {
    addToCart(product, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }
  return (
    <div className="detail-screen">
      <div className="detail-visual">
        <img src={product.image} alt={product.name} />
        <button className="detail-back" onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <button className="detail-heart">
          <Heart size={21} />
        </button>
        <span className="detail-count">1 / 3</span>
      </div>
      <div className="detail-content">
        <span className="eyebrow">
          {product.brand} · {product.sku}
        </span>
        <h1>{product.name}</h1>
        <div className="rating">
          ★★★★★ <span>4.8 (32 avis)</span>
        </div>
        <div className="detail-price">
          {money(product.price)} <small>/ {product.unit}</small>
        </div>
        <div className="availability">
          <Check size={16} /> En stock <span>Livraison sous 2–4 jours</span>
        </div>
        {product.category === "Carrelage" && (
          <div className="conversion">
            <Box size={21} />
            <div>
              <strong>1 carton = 1,44 m²</strong>
              <span>
                4 pièces · Format 60 × 60 cm · {money(product.price * 1.44)} /
                carton
              </span>
            </div>
          </div>
        )}
        <section className="detail-section">
          <h2>Description</h2>
          <p>{product.description}</p>
        </section>
        <section className="detail-section">
          <h2>Finition</h2>
          <div className="swatches">
            <button className="swatch sand active" />
            <button className="swatch stone" />
            <button className="swatch white" />
          </div>
        </section>
        <section className="detail-section specs">
          <h2>Caractéristiques</h2>
          <div>
            <span>Dimensions</span>
            <strong>{product.dimensions}</strong>
          </div>
          <div>
            <span>Origine</span>
            <strong>Italie</strong>
          </div>
          <div>
            <span>Usage</span>
            <strong>Sol & mur</strong>
          </div>
        </section>
      </div>
      <div className="sticky-buy">
        <div className="quantity">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus size={17} />
          </button>
          <strong>{qty}</strong>
          <button onClick={() => setQty(qty + 1)}>
            <Plus size={17} />
          </button>
        </div>
        <button className={added ? "primary added" : "primary"} onClick={add}>
          {added ? (
            <>
              <Check size={18} /> Ajouté au panier
            </>
          ) : (
            <>Ajouter · {money(product.price * qty)}</>
          )}
        </button>
      </div>
    </div>
  )
}

function CartScreen({ checkout }: { checkout: () => void }) {
  const { cart, changeQuantity, removeFromCart } = useAppStore()
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  return (
    <>
      <Header
        title="Mon panier"
        eyebrow={`${cart.length} article${cart.length > 1 ? "s" : ""}`}
      />
      <main className="cart-page">
        {cart.length === 0 ? (
          <div className="empty-state">
            <div>
              <ShoppingCart size={34} />
            </div>
            <h2>Votre panier est vide</h2>
            <p>
              Découvrez nos collections et trouvez les pièces idéales pour votre
              projet.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <article className="cart-item" key={item.product.id}>
                  <img src={item.product.image} alt="" />
                  <div className="cart-copy">
                    <span>{item.product.brand}</span>
                    <h3>{item.product.name}</h3>
                    <small>
                      {money(item.product.price)} / {item.product.unit}
                    </small>
                    <div className="cart-actions">
                      <div className="quantity small">
                        <button
                          onClick={() => changeQuantity(item.product.id, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <strong>{item.quantity}</strong>
                        <button
                          onClick={() => changeQuantity(item.product.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <strong>{money(item.product.price * item.quantity)}</strong>
                </article>
              ))}
            </div>
            <div className="delivery-note">
              <Truck size={21} />
              <div>
                <strong>Livraison offerte dès 500 TND</strong>
                <span>
                  Il vous reste {money(Math.max(0, 500 - total))} pour en
                  profiter.
                </span>
              </div>
            </div>
            <div className="summary">
              <h2>Récapitulatif</h2>
              <div>
                <span>Sous-total</span>
                <strong>{money(total)}</strong>
              </div>
              <div>
                <span>Livraison</span>
                <strong>Calculée à l’étape suivante</strong>
              </div>
              <div className="summary-total">
                <span>Total estimé</span>
                <strong>{money(total)}</strong>
              </div>
              <button className="primary wide" onClick={checkout}>
                Passer la commande <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </main>
    </>
  )
}

function OrdersScreen() {
  return (
    <>
      <Header title="Mes commandes" eyebrow="Suivez vos achats en temps réel" />
      <main>
        <div className="segmented">
          <button className="active">En cours</button>
          <button>Historique</button>
        </div>
        <div className="order-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <span>Commande</span>
                  <strong>#{order.id}</strong>
                </div>
                <span className={`status ${order.statusKey}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-products">
                <div>
                  {order.images.map((image) => (
                    <img key={image} src={image} alt="" />
                  ))}
                </div>
                <span>{order.items} articles</span>
              </div>
              <div className="progress">
                <i />
                <i />
                <i className={order.progress > 2 ? "active" : ""} />
                <i className={order.progress > 3 ? "active" : ""} />
              </div>
              <div className="order-bottom">
                <div>
                  <span>Prévue le</span>
                  <strong>{order.date}</strong>
                </div>
                <strong>{money(order.total)}</strong>
                <button>
                  <ChevronRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}

function InvoicePreviewCard() {
  const { customerProfile, cart } = useAppStore()
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const identity =
    customerProfile.accountType === "BUSINESS"
      ? customerProfile.companyName
      : `${customerProfile.firstName} ${customerProfile.lastName}`
  return (
    <section className="invoice-preview">
      <div className="invoice-preview-head">
        <div className="brand-mark">
          <span>N</span>
        </div>
        <div>
          <span>APERÇU DE FACTURE</span>
          <strong>Document provisoire</strong>
        </div>
      </div>
      <div className="invoice-identities">
        <div>
          <span>FACTURÉ À</span>
          <strong>{identity}</strong>
          {customerProfile.accountType === "BUSINESS" && (
            <small>
              Matricule fiscal : {customerProfile.taxRegistrationNumber}
            </small>
          )}
          <small>{customerProfile.billingAddress}</small>
        </div>
        <div>
          <span>FACTURE N°</span>
          <strong>Attribuée à la confirmation</strong>
          <span>DATE</span>
          <strong>Attribuée par le backend</strong>
        </div>
      </div>
      <div className="invoice-lines">
        <div className="invoice-line invoice-labels">
          <span>Produit</span>
          <span>Qté.</span>
          <span>Prix</span>
          <span>Total</span>
        </div>
        {(cart.length ? cart : [{ product: products[0], quantity: 1 }]).map(
          (item) => (
            <div className="invoice-line" key={item.product.id}>
              <span>
                <strong>{item.product.name}</strong>
                <small>
                  {item.product.sku} · {item.product.unit}
                </small>
              </span>
              <span>{item.quantity}</span>
              <span>{money(item.product.price)}</span>
              <span>{money(item.product.price * item.quantity)}</span>
            </div>
          ),
        )}
      </div>
      <div className="invoice-totals">
        <div>
          <span>Sous-total produits</span>
          <strong>{money(subtotal || products[0].price)}</strong>
        </div>
        <div>
          <span>Taxes applicables</span>
          <strong>Retournées par l’API</strong>
        </div>
        <div>
          <span>Total final</span>
          <strong>Calculé à la confirmation</strong>
        </div>
      </div>
      <p>
        <ShieldCheck size={14} /> Les taux, taxes et mentions légales seront
        exclusivement affichés selon les données validées par le backend NEXORA.
      </p>
    </section>
  )
}

function CheckoutScreen({ onBack }: { onBack: () => void }) {
  const { customerProfile: profile, setCustomerProfile } = useAppStore()
  const [editBilling, setEditBilling] = useState(false)
  const [billingAddress, setBillingAddress] = useState(profile.billingAddress)
  const isBusiness = profile.accountType === "BUSINESS"
  return (
    <>
      <Header title="Facturation & livraison" back onBack={onBack} />
      <main className="checkout-page">
        <div className="checkout-steps">
          <span className="done">1</span>
          <i />
          <span className="active">2</span>
          <i />
          <span>3</span>
        </div>
        <section className="checkout-block">
          <div className="checkout-block-title">
            <div>
              <FileText size={19} />
              <span>
                <strong>Informations de facturation</strong>
                <small>
                  {isBusiness ? "Compte entreprise" : "Compte particulier"}
                </small>
              </span>
            </div>
            <button onClick={() => setEditBilling(!editBilling)}>
              <Pencil size={14} /> Modifier
            </button>
          </div>
          <div className="billing-identity">
            <div
              className={
                isBusiness ? "identity-icon business" : "identity-icon"
              }
            >
              {isBusiness ? <Building2 /> : <CircleUserRound />}
            </div>
            <div>
              <span>{isBusiness ? "ENTREPRISE" : "PARTICULIER"}</span>
              <strong>
                {isBusiness
                  ? profile.companyName
                  : `${profile.firstName} ${profile.lastName}`}
              </strong>
              {isBusiness && (
                <small>MF : {profile.taxRegistrationNumber}</small>
              )}
              <small>
                {profile.email} · {profile.phone}
              </small>
            </div>
          </div>
          {editBilling ? (
            <label className="checkout-address">
              <span>Adresse de facturation</span>
              <input
                value={billingAddress}
                onChange={(event) => setBillingAddress(event.target.value)}
              />
              <small>La mise à jour sera validée par le futur backend.</small>
              <button
                onClick={() => {
                  setCustomerProfile({ ...profile, billingAddress })
                  setEditBilling(false)
                }}
              >
                <Check size={13} /> Utiliser cette adresse
              </button>
            </label>
          ) : (
            <div className="saved-address">
              <MapPin size={17} />
              <div>
                <span>ADRESSE DE FACTURATION</span>
                <strong>{profile.billingAddress}</strong>
              </div>
              <Check size={16} />
            </div>
          )}
        </section>
        <section className="checkout-block">
          <div className="checkout-block-title">
            <div>
              <Truck size={19} />
              <span>
                <strong>Adresse de livraison</strong>
                <small>Distincte de la facturation</small>
              </span>
            </div>
            <button>
              <Pencil size={14} /> Modifier
            </button>
          </div>
          <div className="saved-address delivery">
            <MapPin size={17} />
            <div>
              <span>LIVRAISON</span>
              <strong>12, rue des Jasmins, La Marsa 2070</strong>
            </div>
            <Check size={16} />
          </div>
        </section>
        <InvoicePreviewCard />
        <button
          className="primary wide"
          onClick={() =>
            window.alert(
              "La confirmation sera activée après connexion au backend FastAPI.",
            )
          }
        >
          Continuer vers la confirmation <ChevronRight size={18} />
        </button>
      </main>
    </>
  )
}

function Profile({ setMode }: { setMode: (role: UserRole) => void }) {
  const { customerProfile, setCustomerProfile } = useAppStore()
  const [editing, setEditing] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const business = customerProfile.accountType === "BUSINESS"
  const title = business
    ? customerProfile.companyName
    : `${customerProfile.firstName} ${customerProfile.lastName}`
  const initials = business
    ? customerProfile.companyName.slice(0, 2).toUpperCase()
    : `${customerProfile.firstName[0]}${customerProfile.lastName[0]}`
  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setCustomerProfile(
      business
        ? {
            ...customerProfile,
            companyName: String(data.get("name")),
            contactPerson: String(data.get("contact")),
            email: String(data.get("email")),
            phone: String(data.get("phone")),
            billingAddress: String(data.get("address")),
          }
        : {
            ...customerProfile,
            firstName: String(data.get("firstName")),
            lastName: String(data.get("lastName")),
            email: String(data.get("email")),
            phone: String(data.get("phone")),
            billingAddress: String(data.get("address")),
          },
    )
    setEditing(false)
  }
  return (
    <>
      <Header title="Mon compte" />
      <main className="profile-page">
        <div className="profile-card">
          <div className="avatar">{initials}</div>
          <div>
            <div className="profile-name-line">
              <h2>{title}</h2>
              {business && <i>ENTREPRISE</i>}
            </div>
            <span>{customerProfile.email}</span>
          </div>
          <button onClick={() => setEditing(!editing)}>
            <Pencil />
          </button>
        </div>
        {editing && (
          <form className="profile-edit-form" onSubmit={saveProfile}>
            <div className="profile-form-heading">
              <strong>
                {business
                  ? "Informations de l’entreprise"
                  : "Informations personnelles"}
              </strong>
              <span>Modifications soumises à validation future.</span>
            </div>
            {business ? (
              <>
                <label>
                  Raison sociale
                  <input
                    name="name"
                    defaultValue={customerProfile.companyName}
                    required
                  />
                </label>
                <label>
                  Matricule fiscal
                  <input
                    value={customerProfile.taxRegistrationNumber}
                    disabled
                  />
                  <small>Modification soumise à vérification NEXORA.</small>
                </label>
                <label>
                  Personne de contact
                  <input
                    name="contact"
                    defaultValue={customerProfile.contactPerson}
                    required
                  />
                </label>
              </>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    Prénom
                    <input
                      name="firstName"
                      defaultValue={customerProfile.firstName}
                      required
                    />
                  </label>
                  <label>
                    Nom
                    <input
                      name="lastName"
                      defaultValue={customerProfile.lastName}
                      required
                    />
                  </label>
                </div>
                <label>
                  Information CIN complémentaire
                  <input
                    value={
                      customerProfile.cinLastFour
                        ? `•••• ${customerProfile.cinLastFour}`
                        : "Non renseignée"
                    }
                    disabled
                  />
                  <small>Ne constitue jamais une preuve d’identité.</small>
                </label>
              </>
            )}
            <label>
              E-mail
              <input
                name="email"
                type="email"
                defaultValue={customerProfile.email}
                required
              />
            </label>
            <label>
              Téléphone
              <input
                name="phone"
                defaultValue={customerProfile.phone}
                required
              />
            </label>
            <label>
              Adresse de facturation
              <input
                name="address"
                defaultValue={customerProfile.billingAddress}
                required
              />
            </label>
            <div className="edit-actions">
              <button type="button" onClick={() => setEditing(false)}>
                Annuler
              </button>
              <button>Enregistrer</button>
            </div>
          </form>
        )}
        <div className="account-summary">
          <div>
            <span>TYPE DE COMPTE</span>
            <strong>{business ? "Entreprise" : "Particulier"}</strong>
          </div>
          <div>
            <span>FACTURATION</span>
            <strong>{customerProfile.billingAddress}</strong>
          </div>
          {business && (
            <div>
              <span>MATRICULE FISCAL</span>
              <strong>{customerProfile.taxRegistrationNumber}</strong>
            </div>
          )}
          <div>
            <span>CONTACT</span>
            <strong>
              {business ? customerProfile.contactPerson : customerProfile.phone}
            </strong>
          </div>
        </div>
        <div className="loyalty">
          <span>MEMBRE NEXORA PRIVILÈGE</span>
          <strong>1 250 points</strong>
          <div>
            <i />
          </div>
          <small>Plus que 250 points avant votre prochain avantage</small>
        </div>
        <div className="menu-group">
          <button>
            <span>
              <CircleUserRound /> Informations personnelles
            </span>
            <ChevronRight />
          </button>
          <button onClick={() => setShowInvoice(!showInvoice)}>
            <span>
              <FileText /> Aperçu de facture
            </span>
            <ChevronRight />
          </button>
          <button>
            <span>
              <MapPin /> Mes adresses
            </span>
            <ChevronRight />
          </button>
          <button>
            <span>
              <Bell /> Notifications
            </span>
            <ChevronRight />
          </button>
          <button>
            <span>
              <Settings /> Langue <small>Français</small>
            </span>
            <ChevronRight />
          </button>
        </div>
        {showInvoice && <InvoicePreviewCard />}
        <div className="preview-box">
          <span>APERÇU DÉMONSTRATION</span>
          <h3>Vous êtes un collaborateur NEXORA ?</h3>
          <p>
            Basculez vers l’espace employé pour prévisualiser les outils
            opérationnels.
          </p>
          <button onClick={() => setMode("STOCK_MANAGER")}>
            Ouvrir l’espace employé <ChevronRight size={17} />
          </button>
        </div>
      </main>
    </>
  )
}

function EmployeeDashboard({ goTo }: { goTo: (tab: EmployeeTab) => void }) {
  return (
    <>
      <header className="employee-header">
        <div className="brand-mark light">
          <span>N</span>
        </div>
        <div>
          <span>Mercredi 12 juin</span>
          <h1>Bonjour, Mehdi</h1>
        </div>
        <IconButton icon={Bell} label="Notifications" badge={5} />
      </header>
      <main>
        <section className="shift-card">
          <div>
            <span>ACTIVITÉ DU JOUR</span>
            <h2>Les opérations sont en bonne voie.</h2>
            <p>8 commandes nécessitent votre attention.</p>
          </div>
          <div className="score">
            <strong>84%</strong>
            <span>Traité</span>
          </div>
        </section>
        <SectionTitle title="Vue d’ensemble" />
        <div className="metric-grid">
          <Metric
            icon={ClipboardList}
            value="24"
            label="Commandes"
            trend="+12%"
          />
          <Metric icon={Clock3} value="08" label="En attente" alert />
          <Metric icon={PackageCheck} value="11" label="Prêtes" />
          <Metric icon={Truck} value="07" label="Livraisons" />
        </div>
        <section className="attention">
          <div className="section-title">
            <h2>À traiter en priorité</h2>
            <button onClick={() => goTo("orders")}>
              Tout voir <ChevronRight size={15} />
            </button>
          </div>
          {orders.slice(0, 2).map((o, i) => (
            <article key={o.id}>
              <div className={i ? "priority stock-priority" : "priority"}>
                {i ? <Box /> : <Clock3 />}
              </div>
              <div>
                <span>{i ? "STOCK FAIBLE" : "NOUVELLE COMMANDE"}</span>
                <strong>
                  {i ? "Carrelage Calacatta Gold" : `Commande #${o.id}`}
                </strong>
                <small>
                  {i
                    ? "6 cartons disponibles"
                    : "Ahmed Trabelsi · il y a 12 min"}
                </small>
              </div>
              <ChevronRight />
            </article>
          ))}
        </section>
        <SectionTitle title="Activité des commandes" action="Cette semaine" />
        <div className="chart-card">
          <div className="chart-bars">
            {[42, 68, 54, 82, 72, 94, 61].map((h, i) => (
              <div key={i}>
                <i
                  style={{ height: `${h}%` }}
                  className={i === 5 ? "today" : ""}
                />
                <span>{["L", "M", "M", "J", "V", "S", "D"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function Metric({
  icon: Icon,
  value,
  label,
  trend,
  alert,
}: {
  icon: LucideIcon
  value: string
  label: string
  trend?: string
  alert?: boolean
}) {
  return (
    <article className="metric">
      <div className={alert ? "metric-icon alert" : "metric-icon"}>
        <Icon size={20} />
      </div>
      <strong>{value}</strong>
      <span>{label}</span>
      {trend && <small>{trend}</small>}
    </article>
  )
}

function Inventory() {
  return (
    <>
      <Header title="État du stock" eyebrow="Données synchronisées à 09:42" />
      <main>
        <SearchBar placeholder="Nom, référence ou code-barres…" />
        <div className="inventory-summary">
          <Metric icon={Box} value="1 284" label="Références" />
          <Metric icon={Clock3} value="12" label="Stock faible" alert />
        </div>
        <div className="segmented">
          <button className="active">Tous</button>
          <button>Alertes</button>
          <button>Ruptures</button>
        </div>
        <div className="stock-list">
          {stockAlerts.map((item) => (
            <article key={item.sku}>
              <img src={item.image} alt="" />
              <div>
                <span>{item.sku}</span>
                <h3>{item.name}</h3>
                <small>
                  Physique <b>{item.physical}</b> · Réservé{" "}
                  <b>{item.reserved}</b>
                </small>
                <div className="stock-meter">
                  <i style={{ width: `${item.level}%` }} />
                </div>
              </div>
              <div
                className={item.level < 20 ? "stock-count low" : "stock-count"}
              >
                <strong>{item.available}</strong>
                <span>dispo.</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}

function EmployeeProfile({ setMode }: { setMode: (role: UserRole) => void }) {
  return (
    <>
      <Header title="Profil employé" />
      <main className="profile-page">
        <div className="profile-card employee-profile">
          <div className="avatar">MB</div>
          <div>
            <h2>Mehdi Ben Amor</h2>
            <span>Responsable de stock · Sousse</span>
          </div>
        </div>
        <div className="menu-group">
          <button>
            <span>
              <UserRound /> Mes informations
            </span>
            <ChevronRight />
          </button>
          <button>
            <span>
              <Bell /> Préférences d’alertes
            </span>
            <ChevronRight />
          </button>
          <button>
            <span>
              <Settings /> Paramètres
            </span>
            <ChevronRight />
          </button>
        </div>
        <button className="customer-switch" onClick={() => setMode("CUSTOMER")}>
          Revenir à l’expérience client
        </button>
      </main>
    </>
  )
}

function BottomNav<T extends string>({
  items,
  active,
  onChange,
}: {
  items: { id: T label: string icon: LucideIcon badge?: number }[]
  active: T
  onChange: (id: T) => void
}) {
  return (
    <nav className="bottom-nav">
      {items.map(({ id, label, icon: Icon, badge }) => (
        <button
          key={id}
          className={active === id ? "active" : ""}
          onClick={() => onChange(id)}
        >
          <span>
            <Icon size={21} />
            {badge ? <i>{badge}</i> : null}
          </span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  const { role, setRole, cart, session, setSession, setCustomerProfile } =
    useAppStore()
  const [entryScreen, setEntryScreen] = useState<EntryScreen>("landing")
  const [customerTab, setCustomerTab] = useState<CustomerTab>("home")
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>("dashboard")
  const [selected, setSelected] = useState<Product | null>(null)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const isCustomer = role === "CUSTOMER"
  const enterGuest = () => {
    setRole("CUSTOMER")
    setSession("guest")
    setCustomerTab("home")
    window.scrollTo(0, 0)
  }
  const authenticate = (nextRole: UserRole) => {
    setRole(nextRole)
    setSession("authenticated")
    setCustomerTab("home")
    setEmployeeTab("dashboard")
    window.scrollTo(0, 0)
  }
  const previewRegisteredProfile = () => {
    setRole("CUSTOMER")
    setSession("authenticated")
    setCustomerTab("profile")
    window.scrollTo(0, 0)
  }
  const goToAuth = (screen: "login" | "register") => {
    setShowAuthPrompt(false)
    setSession("anonymous")
    setEntryScreen(screen)
    window.scrollTo(0, 0)
  }
  const setMode = (next: UserRole) => {
    setRole(next)
    setSelected(null)
    window.scrollTo(0, 0)
  }
  const customerItems = [
    { id: "home" as const, label: "Accueil", icon: Home },
    { id: "catalogue" as const, label: "Catalogue", icon: LayoutGrid },
    {
      id: "cart" as const,
      label: "Panier",
      icon: ShoppingCart,
      badge: cart.length,
    },
    { id: "orders" as const, label: "Commandes", icon: ClipboardList },
    { id: "profile" as const, label: "Profil", icon: UserRound },
  ]
  const employeeItems = [
    { id: "dashboard" as const, label: "Tableau", icon: Home },
    {
      id: "orders" as const,
      label: "Commandes",
      icon: ClipboardList,
      badge: 8,
    },
    { id: "stock" as const, label: "Stock", icon: Box },
    { id: "deliveries" as const, label: "Livraisons", icon: Truck },
    { id: "profile" as const, label: "Profil", icon: UserRound },
  ]
  if (session === "anonymous") {
    return (
      <div className="app-shell marketing-shell">
        <div className="safe-area" />
        <EntryExperience
          screen={entryScreen}
          setScreen={setEntryScreen}
          onGuest={enterGuest}
          onAuthenticated={authenticate}
          onRegistered={setCustomerProfile}
          onRegistrationPreview={previewRegisteredProfile}
        />
      </div>
    )
  }
  let content
  if (selected)
    content = (
      <ProductDetail product={selected} onBack={() => setSelected(null)} />
    )
  else if (isCustomer) {
    content =
      customerTab === "home" ? (
        <CustomerHome openProduct={setSelected} goTo={setCustomerTab} />
      ) : customerTab === "catalogue" ? (
        <Catalogue openProduct={setSelected} />
      ) : customerTab === "cart" ? (
        <CartScreen
          checkout={() =>
            session === "guest"
              ? setShowAuthPrompt(true)
              : setCustomerTab("checkout")
          }
        />
      ) : customerTab === "checkout" ? (
        <CheckoutScreen onBack={() => setCustomerTab("cart")} />
      ) : customerTab === "orders" ? (
        <OrdersScreen />
      ) : (
        <Profile setMode={setMode} />
      )
  } else {
    content =
      employeeTab === "dashboard" ? (
        <EmployeeDashboard goTo={setEmployeeTab} />
      ) : employeeTab === "stock" ? (
        <Inventory />
      ) : employeeTab === "profile" ? (
        <EmployeeProfile setMode={setMode} />
      ) : employeeTab === "deliveries" ? (
        <>
          <Header
            title="Livraisons"
            eyebrow="7 tournées assignées aujourd’hui"
          />
          <main>
            <div className="route-card">
              <MapPin />
              <div>
                <span>PROCHAINE ÉTAPE · 10:30</span>
                <h2>Ahmed Trabelsi</h2>
                <p>La Marsa, Tunis · Commande #NEX-1048</p>
                <button>Ouvrir la livraison</button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <Header
            title="Commandes"
            eyebrow="8 commandes nécessitent une action"
          />
          <main>
            <SearchBar placeholder="Commande, client ou téléphone…" />
            <OrdersScreen />
          </main>
        </>
      )
  }
  return (
    <div className={`app-shell ${isCustomer ? "" : "employee-mode"}`}>
      <div className="safe-area" />
      {content}
      {!selected &&
        (isCustomer ? (
          <BottomNav
            items={customerItems}
            active={customerTab}
            onChange={(tab) => {
              if (
                session === "guest" &&
                (tab === "orders" || tab === "profile")
              ) {
                setShowAuthPrompt(true)
                return
              }
              setCustomerTab(tab)
            }}
          />
        ) : (
          <BottomNav
            items={employeeItems}
            active={employeeTab}
            onChange={setEmployeeTab}
          />
        ))}
      {showAuthPrompt && (
        <AuthPrompt
          onClose={() => setShowAuthPrompt(false)}
          onLogin={() => goToAuth("login")}
          onRegister={() => goToAuth("register")}
        />
      )}
    </div>
  )
}
