import type { UserWithRoles } from "actions/user";

export enum Permission {
	ManageUser = "manage-user",
	ManageRole = "manage-role",
	ManageTour = "manage-tour",
	ManagePermission = "manage-permission",
	ManageBlog = "manage-blog",
	ManagePromotion = "manage-promotion",
	AccessAdmin = "access-admin",
}

export const checkPermission = (
	userRoles: UserWithRoles["userRoles"],
	requiredPermissions: Permission[] = [],
) => {
	const permissions = [
		...new Set(
			userRoles.flatMap((userRole) => {
				return userRole.role.rolePermissions.map(
					(rolePermission) => rolePermission.permission.slug,
				);
			}),
		),
	];

	return requiredPermissions.every((permission) =>
		permissions.includes(permission),
	);
};
