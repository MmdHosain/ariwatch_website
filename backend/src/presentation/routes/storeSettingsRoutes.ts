import { Router } from 'express';
import type { AuthService } from '../../application/services/AuthService';
import type { QueryExecutor } from '../../domain/ports/Database';
import { StoreSettingsService } from '../../application/settings/StoreSettingsService';
import { resolveSlotVideoUrl, syncAriwatchVideos } from '../../application/settings/syncAriwatchVideos';
import { asyncRoute, authMiddleware } from '../middleware';
import { requirePermission } from '../permissions';

export function createStoreSettingsRoutes(auth: Pick<AuthService, 'authenticate'>, db: QueryExecutor) {
  const router = Router();
  const settings = new StoreSettingsService(db);
  const authenticated = authMiddleware(auth);
  router.get('/storefront/settings', asyncRoute(async (_req, res) => {
    const { heroStyle, storefront } = await settings.get();
    res.set('Cache-Control', 'no-store').json({ heroStyle, storefront });
  }));
  router.get('/storefront/video/:slot', asyncRoute(async (req, res) => {
    const target = await resolveSlotVideoUrl(req.params.slot);
    res.redirect(302, target);
  }));
  router.get('/shipping', asyncRoute(async (_req, res) => {
    const { shippingCost } = await settings.get();
    res.set('Cache-Control', 'no-store').json({ shippingCost });
  }));
  router.get('/admin/settings', authenticated, requirePermission('settings'), asyncRoute(async (_req, res) => {
    res.set('Cache-Control', 'no-store').json(await settings.get());
  }));
  router.put('/admin/settings', authenticated, requirePermission('settings'), asyncRoute(async (req, res) => {
    res.set('Cache-Control', 'no-store').json(await settings.update(req.body));
  }));
  router.post('/admin/settings/sync-videos', authenticated, requirePermission('settings'), asyncRoute(async (_req, res) => {
    res.set('Cache-Control', 'no-store').json(await syncAriwatchVideos(settings));
  }));
  return router;
}
