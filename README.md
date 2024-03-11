# quick-shelter-admin-dash

Admin dashboard for Renewed Hope

# Notes

## Featured Image Steps

1. Copy feature image from Vercel if you cannot generate optimised images yourself.
2. Save as featured_image.png in public folder.
3. If you use another image format, please update the name in index.html

## Notes
### Routing
1. The Role-based route (RoleBasedRouteGuard) guard is for routing, while the plain role guard (RoleGuard) is for components.

### Naming
1. Apartments and Units mean the same thing, so don't be surpriced to  
see code like, 'unit: IApartment". I will eventually make IApartment  
IUnit, but note that the API uses 'apartment' to mean 'unit', while the product team favours 'unit'. hence the confusion.