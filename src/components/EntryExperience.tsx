import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Eye,
  EyeOff,
  LayoutGrid,
  LockKeyhole,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { products } from "../data/mockData"
import type {
  CustomerAccountType,
  CustomerProfile,
  Product,
  UserRole,
} from "../types"

export type EntryScreen = "landing" | "login" | "register" | "registered"

const money = (value: number) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 3,
  }).format(value)

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <div className="landing-brand">
      <div className={dark ? "brand-mark" : "brand-mark light"}>
        <span>N</span>
      </div>
      <div>
        <strong>NEXORA</strong>
        <small>Smart Stock · La maison, mieux pensée.</small>
      </div>
    </div>
  )
}

function LandingProduct({
  product,
  onExplore,
}: {
  product: Product
  onExplore: () => void
}) {
  return (
    <button className="landing-product" onClick={onExplore}>
      <div>
        <img src={product.image} alt={product.name} />
        {product.badge && <span>{product.badge}</span>}
      </div>
      <small>
        {product.brand} · {product.sku}
      </small>
      <strong>{product.name}</strong>
      <p>
        {money(product.price)} <span>/ {product.unit}</span>
      </p>
      <i>{product.inStock ? "En stock" : "Sur commande"}</i>
    </button>
  )
}

function LandingPage({
  navigate,
  continueAsGuest,
}: {
  navigate: (screen: EntryScreen) => void
  continueAsGuest: () => void
}) {
  const categories = [
    ["Carrelage", products[0].image],
    [
      "Faïence",
      "https://images.unsplash.com/photo-1745124372431-588a424d112f?auto=format&fit=crop&w=500&q=85",
    ],
    ["Sanitaire", products[1].image],
    ["Robinetterie", products[2].image],
    [
      "Accessoires",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=500&q=85",
    ],
  ]
  const benefits: [LucideIcon, string, string][] = [
    [
      LayoutGrid,
      "Un choix incomparable",
      "Plus de 1 200 références sélectionnées.",
    ],
    [
      Award,
      "Une qualité exigeante",
      "Des marques reconnues et des finitions durables.",
    ],
    [
      ShoppingBag,
      "Commander simplement",
      "Un parcours clair, du choix à la livraison.",
    ],
    [
      UsersRound,
      "Un conseil professionnel",
      "Une équipe disponible pour votre projet.",
    ],
    [
      PackageCheck,
      "Un stock centralisé",
      "Une disponibilité claire et actualisée.",
    ],
  ]
  const steps: [LucideIcon, string, string][] = [
    [Search, "Découvrez", "Parcourez nos collections et trouvez vos produits."],
    [
      ShoppingCart,
      "Composez",
      "Ajoutez les quantités souhaitées à votre panier.",
    ],
    [ClipboardList, "Commandez", "Validez vos informations et votre commande."],
    [Truck, "Suivez", "Suivez chaque étape jusqu’à votre livraison."],
  ]
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <Brand />
        <div className="landing-nav-actions">
          <button className="nav-login" onClick={() => navigate("login")}>
            Se connecter
          </button>
          <button className="nav-account" onClick={() => navigate("register")}>
            Créer un compte
          </button>
        </div>
      </header>
      <section className="landing-hero">
        <img
          src="https://images.unsplash.com/photo-1756079664354-34944e001f6d?auto=format&fit=crop&w=1600&q=88"
          alt="Salle de bain premium avec vasques en marbre"
        />
        <div className="landing-hero-shade" />
        <div className="landing-hero-copy">
          <span>VOTRE PROJET COMMENCE ICI</span>
          <h1>Tout pour votre maison, au même endroit.</h1>
          <p>
            Découvrez notre collection de carrelage, sanitaire, robinetterie et
            accessoires de salle de bain.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-primary" onClick={continueAsGuest}>
              Découvrir nos produits <ArrowRight size={18} />
            </button>
            <button
              className="landing-secondary"
              onClick={() => navigate("login")}
            >
              Se connecter
            </button>
          </div>
          <button className="guest-link" onClick={continueAsGuest}>
            Continuer en tant qu’invité <ChevronRight size={15} />
          </button>
        </div>
        <div className="hero-proof">
          <strong>+ 1 200</strong>
          <span>références disponibles</span>
          <i />
          <strong>35 ans</strong>
          <span>d’expertise en Tunisie</span>
        </div>
      </section>

      <main className="landing-main">
        <section className="landing-section">
          <div className="landing-heading">
            <span>NOS UNIVERS</span>
            <h2>Imaginez. Composez. Créez.</h2>
            <p>Des collections choisies pour donner vie à chaque espace.</p>
          </div>
          <div className="landing-categories">
            {categories.map(([name, image], index) => (
              <button key={name} onClick={continueAsGuest}>
                <img src={image} alt={name} />
                <div>
                  <small>0{index + 1}</small>
                  <strong>{name}</strong>
                  <ArrowRight size={17} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="why-section">
          <div className="why-image">
            <img
              src="https://images.unsplash.com/photo-1657114012245-cfa18766a58a?auto=format&fit=crop&w=1000&q=85"
              alt="Salle de bain élégante NEXORA"
            />
            <div>
              <strong>NEXORA</strong>
              <span>Une expertise au service de vos espaces depuis 1990.</span>
            </div>
          </div>
          <div className="why-copy">
            <div className="landing-heading left">
              <span>POURQUOI NEXORA ?</span>
              <h2>La confiance se construit dans chaque détail.</h2>
            </div>
            <div className="benefit-list">
              {benefits.map(([Icon, title, text]) => (
                <article key={title}>
                  <div>
                    <Icon size={20} />
                  </div>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section featured-landing">
          <div className="landing-heading">
            <span>LA SÉLECTION NEXORA</span>
            <h2>Des pièces qui font la différence.</h2>
          </div>
          <div className="landing-products">
            {products.slice(0, 4).map((product) => (
              <LandingProduct
                key={product.id}
                product={product}
                onExplore={continueAsGuest}
              />
            ))}
          </div>
          <button className="outline-cta" onClick={continueAsGuest}>
            Voir tout le catalogue <ArrowRight size={17} />
          </button>
        </section>

        <section className="steps-section">
          <div className="landing-heading">
            <span>COMMENT ÇA MARCHE ?</span>
            <h2>Votre projet, en toute simplicité.</h2>
          </div>
          <div className="steps-grid">
            {steps.map(([Icon, title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div>
                  <Icon size={22} />
                </div>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-final-cta">
          <div>
            <span>PRÊT À COMMENCER ?</span>
            <h2>Donnez vie à votre prochain espace.</h2>
          </div>
          <div>
            <button className="landing-primary" onClick={continueAsGuest}>
              Explorer le catalogue <ArrowRight size={18} />
            </button>
            <button
              className="landing-secondary"
              onClick={() => navigate("register")}
            >
              Créer mon compte
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand">
          <Brand />
        </div>
        <div className="footer-links">
          <div>
            <strong>NEXORA</strong>
            <button>À propos</button>
            <button>Nos showrooms</button>
          </div>
          <div>
            <strong>Informations</strong>
            <button>Conditions générales</button>
            <button>Confidentialité</button>
          </div>
          <div>
            <strong>Contact</strong>
            <span>+216 XX XXX XXX</span>
            <span>contact@nexora.tn</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NEXORA. Tous droits réservés.</span>
          <div>
            <button aria-label="Réseau photo">
              <Camera size={17} />
            </button>
            <button aria-label="Réseau social">
              <Share2 size={17} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

const loginSchema = z.object({
  email: z.string().min(1, "Saisissez votre e-mail ou téléphone."),
  password: z.string().min(6, "Utilisez au moins 6 caractères."),
  remember: z.boolean(),
})
type LoginForm = z.infer<typeof loginSchema>

const registrationSchema = z
  .object({
    accountType: z.enum(["INDIVIDUAL", "BUSINESS"]),
    firstName: z.string(),
    lastName: z.string(),
    companyName: z.string(),
    taxRegistrationNumber: z.string(),
    contactPerson: z.string(),
    contactPersonPhone: z.string(),
    email: z.string().email("Adresse e-mail invalide."),
    phone: z
      .string()
      .regex(
        /^(?:\+216\s?)?[24579](?:\s?\d){7}$/,
        "Saisissez un numéro tunisien valide à 8 chiffres.",
      ),
    billingAddress: z.string().min(5, "Saisissez l’adresse de facturation."),
    cinLastFour: z.string(),
    password: z.string().min(8, "Utilisez au moins 8 caractères."),
    confirmPassword: z.string(),
    terms: z.literal(true, { message: "Vous devez accepter les conditions." }),
  })
  .superRefine((data, context) => {
    if (data.accountType === "INDIVIDUAL") {
      if (data.firstName.trim().length < 2)
        context.addIssue({
          code: "custom",
          path: ["firstName"],
          message: "Saisissez au moins 2 caractères.",
        })
      if (data.lastName.trim().length < 2)
        context.addIssue({
          code: "custom",
          path: ["lastName"],
          message: "Saisissez au moins 2 caractères.",
        })
      if (data.cinLastFour && !/^\d{4}$/.test(data.cinLastFour))
        context.addIssue({
          code: "custom",
          path: ["cinLastFour"],
          message: "Saisissez exactement les 4 derniers chiffres.",
        })
    } else {
      if (data.companyName.trim().length < 2)
        context.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Saisissez la raison sociale.",
        })
      if (!/^[A-Za-z0-9/\-\s]{6,30}$/.test(data.taxRegistrationNumber))
        context.addIssue({
          code: "custom",
          path: ["taxRegistrationNumber"],
          message:
            "Format invalide. La conformité finale sera vérifiée par NEXORA.",
        })
      if (data.contactPerson.trim().length < 3)
        context.addIssue({
          code: "custom",
          path: ["contactPerson"],
          message: "Saisissez le nom du contact.",
        })
      if (!/^(?:\+216\s?)?[24579](?:\s?\d){7}$/.test(data.contactPersonPhone))
        context.addIssue({
          code: "custom",
          path: ["contactPersonPhone"],
          message: "Saisissez un numéro tunisien valide.",
        })
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas.",
  })
type RegistrationForm = z.infer<typeof registrationSchema>

function AuthLayout({
  children,
  onBack,
  title,
  subtitle,
}: {
  children: React.ReactNode
  onBack: () => void
  title: string
  subtitle: string
}) {
  return (
    <div className="auth-page">
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?auto=format&fit=crop&w=1100&q=88"
          alt="Intérieur de salle de bain en marbre"
        />
        <div className="auth-image-shade" />
        <div className="auth-image-brand">
          <Brand />
        </div>
        <blockquote>
          « Des espaces d’exception commencent par des choix de qualité. »
        </blockquote>
      </div>
      <div className="auth-panel">
        <button className="auth-back" onClick={onBack}>
          <ArrowLeft size={18} /> Retour
        </button>
        <div className="auth-mobile-brand">
          <Brand dark />
        </div>
        <div className="auth-heading">
          <span>BIENVENUE CHEZ NEXORA</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  icon: Icon,
  children,
}: {
  label: string
  error?: string
  icon?: LucideIcon
  children: React.ReactNode
}) {
  return (
    <label className={error ? "auth-field has-error" : "auth-field"}>
      <span>{label}</span>
      <div>
        {Icon && <Icon size={17} />}
        {children}
      </div>
      {error && <small>{error}</small>}
    </label>
  )
}

function LoginScreen({
  onBack,
  onRegister,
  onAuthenticated,
}: {
  onBack: () => void
  onRegister: () => void
  onAuthenticated: (role: UserRole) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  })
  const submit = (data: LoginForm) => {
    setSubmitting(true)
    window.setTimeout(() => {
      const email = data.email.toLowerCase()
      const role: UserRole = email.includes("stock")
        ? "STOCK_MANAGER"
        : email.includes("livraison")
          ? "DELIVERY_EMPLOYEE"
          : email.includes("vente")
            ? "SALES_EMPLOYEE"
            : email.includes("admin")
              ? "ADMIN"
              : "CUSTOMER"
      setSubmitting(false)
      onAuthenticated(role)
    }, 650)
  }
  return (
    <AuthLayout
      title="Heureux de vous revoir."
      subtitle="Connectez-vous pour retrouver vos projets, commandes et avantages."
      onBack={onBack}
    >
      <div className="demo-notice">
        <ShieldCheck size={17} />
        <span>
          <strong>Mode démonstration</strong> — utilisez une adresse contenant «
          stock », « livraison », « vente » ou « admin » pour prévisualiser un
          rôle employé.
        </span>
      </div>
      <form className="auth-form" onSubmit={handleSubmit(submit)}>
        <Field
          label="E-mail ou numéro de téléphone"
          icon={Mail}
          error={errors.email?.message}
        >
          <input
            placeholder="exemple@email.tn"
            autoComplete="username"
            {...register("email")}
          />
        </Field>
        <Field
          label="Mot de passe"
          icon={LockKeyhole}
          error={errors.password?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </Field>
        <div className="form-options">
          <label>
            <input type="checkbox" {...register("remember")} />
            <i>
              <Check size={12} />
            </i>
            Se souvenir de moi
          </label>
          <button type="button">Mot de passe oublié ?</button>
        </div>
        <button className="auth-submit" disabled={submitting}>
          {submitting ? (
            <span className="loader" />
          ) : (
            <>
              Se connecter <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>
      <div className="auth-divider">
        <span>OU</span>
      </div>
      <p className="auth-switch">
        Nouveau chez NEXORA ?{" "}
        <button onClick={onRegister}>Créer un compte</button>
      </p>
      <small className="auth-security">
        <LockKeyhole size={13} /> Vos données sont protégées et ne sont jamais
        partagées.
      </small>
    </AuthLayout>
  )
}

function RegistrationScreen({
  onBack,
  onLogin,
  onSuccess,
}: {
  onBack: () => void
  onLogin: () => void
  onSuccess: (profile: CustomerProfile) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    shouldUnregister: false,
    defaultValues: {
      accountType: "INDIVIDUAL",
      firstName: "",
      lastName: "",
      companyName: "",
      taxRegistrationNumber: "",
      contactPerson: "",
      contactPersonPhone: "",
      email: "",
      phone: "",
      billingAddress: "",
      cinLastFour: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })
  const accountType = watch("accountType")
  const submitRegistration = (data: RegistrationForm) => {
    const profile: CustomerProfile =
      data.accountType === "BUSINESS"
        ? {
            id: "pending-business",
            accountType: "BUSINESS",
            companyName: data.companyName,
            taxRegistrationNumber: data.taxRegistrationNumber,
            contactPerson: data.contactPerson,
            contactPersonPhone: data.contactPersonPhone,
            email: data.email,
            phone: data.phone,
            billingAddress: data.billingAddress,
          }
        : {
            id: "pending-individual",
            accountType: "INDIVIDUAL",
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            cinLastFour: data.cinLastFour || undefined,
            billingAddress: data.billingAddress,
          }
    onSuccess(profile)
  }
  return (
    <AuthLayout
      title="Créez votre espace."
      subtitle="Un compte client pour commander plus vite et suivre chaque livraison."
      onBack={onBack}
    >
      <div className="customer-only-note">
        <CircleUserRound size={17} />
        <span>
          L’inscription publique crée exclusivement un compte{" "}
          <strong>client</strong>. Les accès employés sont gérés par NEXORA.
        </span>
      </div>
      <form
        className="auth-form register-form"
        onSubmit={handleSubmit(submitRegistration)}
      >
        <div className="account-type-field">
          <span>Type de compte</span>
          <div className="account-type-grid">
            <button
              type="button"
              className={accountType === "INDIVIDUAL" ? "selected" : ""}
              onClick={() => setValue("accountType", "INDIVIDUAL")}
            >
              <div>
                <CircleUserRound size={21} />
              </div>
              <span>
                <strong>Particulier</strong>
                <small>Pour vos projets personnels et votre maison.</small>
              </span>
              <i>
                <Check size={13} />
              </i>
            </button>
            <button
              type="button"
              className={
                accountType === "BUSINESS" ? "selected business" : "business"
              }
              onClick={() => setValue("accountType", "BUSINESS")}
            >
              <div>
                <Building2 size={21} />
              </div>
              <span>
                <strong>Entreprise</strong>
                <small>
                  Pour vos achats professionnels et factures société.
                </small>
              </span>
              <i>
                <Check size={13} />
              </i>
            </button>
          </div>
        </div>
        {accountType === "BUSINESS" ? (
          <>
            <div className="business-form-heading">
              <Building2 size={16} />
              <span>
                <strong>Compte entreprise</strong>
                <small>Informations légales et de facturation</small>
              </span>
            </div>
            <Field
              label="Raison sociale"
              icon={Building2}
              error={errors.companyName?.message}
            >
              <input
                placeholder="Entreprise Tunisienne SARL"
                {...register("companyName")}
              />
            </Field>
            <Field
              label="Matricule fiscal"
              error={errors.taxRegistrationNumber?.message}
            >
              <input
                placeholder="Selon le format validé par NEXORA"
                {...register("taxRegistrationNumber")}
              />
            </Field>
            <Field
              label="Personne de contact"
              icon={CircleUserRound}
              error={errors.contactPerson?.message}
            >
              <input
                placeholder="Nom et prénom"
                {...register("contactPerson")}
              />
            </Field>
            <Field
              label="Téléphone du contact"
              icon={Phone}
              error={errors.contactPersonPhone?.message}
            >
              <input
                type="tel"
                placeholder="+216 XX XXX XXX"
                {...register("contactPersonPhone")}
              />
            </Field>
          </>
        ) : (
          <>
            <div className="form-row">
              <Field label="Prénom" error={errors.firstName?.message}>
                <input placeholder="Amira" {...register("firstName")} />
              </Field>
              <Field label="Nom" error={errors.lastName?.message}>
                <input placeholder="Ben Salem" {...register("lastName")} />
              </Field>
            </div>
            <Field
              label="4 derniers chiffres de la CIN (facultatif)"
              error={errors.cinLastFour?.message}
            >
              <input
                inputMode="numeric"
                maxLength={4}
                placeholder="••••"
                {...register("cinLastFour")}
              />
            </Field>
            <p className="cin-security">
              <ShieldCheck size={14} /> Information complémentaire uniquement.
              Elle ne constitue jamais une preuve d’identité, un mot de passe ou
              un facteur d’authentification.
            </p>
          </>
        )}
        <Field
          label={
            accountType === "BUSINESS"
              ? "E-mail professionnel"
              : "Adresse e-mail"
          }
          icon={Mail}
          error={errors.email?.message}
        >
          <input
            type="email"
            placeholder={
              accountType === "BUSINESS"
                ? "contact@entreprise.tn"
                : "amira@email.tn"
            }
            {...register("email")}
          />
        </Field>
        <Field
          label={
            accountType === "BUSINESS"
              ? "Téléphone de l’entreprise"
              : "Téléphone"
          }
          icon={Phone}
          error={errors.phone?.message}
        >
          <input
            type="tel"
            placeholder="+216 XX XXX XXX"
            {...register("phone")}
          />
        </Field>
        <Field
          label="Adresse de facturation"
          icon={MapPin}
          error={errors.billingAddress?.message}
        >
          <input
            placeholder="Rue, ville, code postal"
            {...register("billingAddress")}
          />
        </Field>
        <div className="form-row">
          <Field label="Mot de passe" error={errors.password?.message}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="8 caractères min."
              {...register("password")}
            />
          </Field>
          <Field label="Confirmation" error={errors.confirmPassword?.message}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmez"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye size={16} />
            </button>
          </Field>
        </div>
        <label className={errors.terms ? "terms-check error" : "terms-check"}>
          <input type="checkbox" {...register("terms")} />
          <i>
            <Check size={12} />
          </i>
          <span>
            J’accepte les <button type="button">Conditions générales</button> et
            la <button type="button">Politique de confidentialité</button>.
          </span>
        </label>
        {errors.terms && (
          <small className="terms-error">{errors.terms.message}</small>
        )}
        <button className="auth-submit">
          Créer mon compte <ArrowRight size={17} />
        </button>
      </form>
      <p className="auth-switch">
        Vous avez déjà un compte ?{" "}
        <button onClick={onLogin}>Se connecter</button>
      </p>
    </AuthLayout>
  )
}

function RegistrationSuccess({
  onLogin,
  onExplore,
}: {
  onLogin: () => void
  onExplore: () => void
}) {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle2 size={38} />
        </div>
        <span>COMPTE CLIENT CRÉÉ</span>
        <h1>Bienvenue dans l’univers NEXORA.</h1>
        <p>
          Votre demande a bien été enregistrée. Lorsque le backend sera
          connecté, un lien de vérification sera envoyé à votre adresse e-mail.
        </p>
        <div className="verification-step">
          <Mail size={20} />
          <div>
            <strong>Prochaine étape</strong>
            <span>
              Vérifiez votre adresse e-mail pour activer votre compte.
            </span>
          </div>
        </div>
        <button className="auth-submit" onClick={onLogin}>
          Accéder à la connexion <ArrowRight size={17} />
        </button>
        <button className="success-explore" onClick={onExplore}>
          Prévisualiser mon profil client
        </button>
      </div>
    </div>
  )
}

export function EntryExperience({
  screen,
  setScreen,
  onGuest,
  onAuthenticated,
  onRegistered,
  onRegistrationPreview,
}: {
  screen: EntryScreen
  setScreen: (screen: EntryScreen) => void
  onGuest: () => void
  onAuthenticated: (role: UserRole) => void
  onRegistered: (profile: CustomerProfile) => void
  onRegistrationPreview: () => void
}) {
  if (screen === "login")
    return (
      <LoginScreen
        onBack={() => setScreen("landing")}
        onRegister={() => setScreen("register")}
        onAuthenticated={onAuthenticated}
      />
    )
  if (screen === "register")
    return (
      <RegistrationScreen
        onBack={() => setScreen("landing")}
        onLogin={() => setScreen("login")}
        onSuccess={(profile) => {
          onRegistered(profile)
          setScreen("registered")
        }}
      />
    )
  if (screen === "registered")
    return (
      <RegistrationSuccess
        onLogin={() => setScreen("login")}
        onExplore={onRegistrationPreview}
      />
    )
  return <LandingPage navigate={setScreen} continueAsGuest={onGuest} />
}

export function AuthPrompt({
  onClose,
  onLogin,
  onRegister,
}: {
  onClose: () => void
  onLogin: () => void
  onRegister: () => void
}) {
  return (
    <div className="auth-prompt-backdrop" role="dialog" aria-modal="true">
      <div className="auth-prompt">
        <button className="prompt-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <div className="prompt-icon">
          <LockKeyhole size={24} />
        </div>
        <span>VOTRE PANIER VOUS ATTEND</span>
        <h2>Connectez-vous pour continuer.</h2>
        <p>
          Votre sélection est conservée. Identifiez-vous ou créez un compte pour
          finaliser votre commande en toute sécurité.
        </p>
        <button className="auth-submit" onClick={onLogin}>
          Se connecter <ArrowRight size={17} />
        </button>
        <button className="prompt-register" onClick={onRegister}>
          Créer un compte
        </button>
        <button className="prompt-explore" onClick={onClose}>
          Continuer à explorer
        </button>
      </div>
    </div>
  )
}
