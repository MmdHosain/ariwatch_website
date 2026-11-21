# AriWatch Replica & Granular Storefront Customization Plan

This plan tracks the step-by-step adaptation of the storefront to match `ariwatch.ir` while making every section and sub-element individually switchable (toggleable) and customizable from the Admin Settings panel.

## Step 1: Backend Domain, Database Migration & Settings API - [COMPLETED]
- [x] **Database Migration (`07-storefront-customization.sql`)**: Add `storefront_config JSONB` column to `store_settings` and allow `ariwatch` hero style.
- [x] **Domain Entity (`StoreSettings.ts`)**: Define `StorefrontConfig` covering all 8 storefront areas (`header`, `hero`, `buyingPaths`, `editorial`, `lookbook`, `spotlights`, `storyGrid`, `footer`) with default values and deep merge helper.
- [x] **Validation (`settings/input.ts`)**: Validate partial section updates, boolean toggles, layout modes, and custom text/URL fields.
- [x] **Service & Routes (`StoreSettingsService.ts`, `storeSettingsRoutes.ts`)**: Support atomic 2-level JSONB partial updates and expose `storefront` config on `/api/storefront/settings` and `/api/admin/settings`.
- [x] **Backend Tests (`store-settings.test.cjs`)**: Verify default config, partial section updates, and validation.

## Step 2: Frontend Storefront Settings Service, Dictionaries & Header/Footer Adaptation - [COMPLETED]
- [x] Expand `frontend/services/store-settings.ts` with typed `StorefrontConfig` and fallback defaults.
- [x] Update English and Persian dictionaries (`common.json`, `home.json`) with exact `ariwatch.ir` navigation, buying guide, paired carousel, and social/footer labels.
- [x] Update `Header.tsx` with `ariwatch.ir` structured Mega Menu (Watches, Original, High Copy, Custom Order, Brands, Buying Guide), WhatsApp quick contact, live search overlay, and per-item visibility switches.
- [x] Update `Footer.tsx` and subcomponents with 5-column `ariwatch.ir` links (The Collection, Find Your AriWatch, Purchase Support, World of AriWatch, More), social links (`IG`, `WA`, `TG`, `BA`, `RU`), and section toggles.

## Step 3: Homepage Sections Adaptation (`ariwatch.ir` Layout & Toggles) - [COMPLETED]
- [x] Implement `AriWatchHero` dual-banner mode in `HeroSection.tsx` (Slide 1: Clear Product Type Separation, Slide 2: Selected Watches & Custom Requests) alongside existing modes.
- [x] Create `BuyingPathsSection.tsx` (Three Clear Buying Paths: Original, Non-Original / High Copy, Custom Order) with individual card toggles.
- [x] Update `CategorisedLookbook.tsx` to include the 6-slide paired wrist-shot + white-background product-shot carousel (`Omega Seamaster`, `IWC Chronograph`, `Rolex Steel & Gold`, `IWC Subseconds`, `Rolex Sport`, `Cartier`) with tab navigation and image toggles.
- [x] Update `EditorialSlider.tsx`, `BrandStoryTeaser.tsx`, `ShopByBrandBanner.tsx`, and `app/[lang]/page.tsx` to respect all granular toggles and custom text overrides.

## Step 4: Admin Panel Granular Customization UI - [COMPLETED]
- [x] Create modular admin customization editors under `frontend/components/admin/settings/` so administrators can toggle every section, sub-card, menu item, and customize text/links in real time.
- [x] Integrate the new customization tabs and 1-click `ariwatch.ir` layout preset into `StoreSettings.tsx` and `HeroSettingsForm.tsx`.
