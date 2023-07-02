import User from '../models/User';
import Role from '../models/Role';

class UserService {
  // 创建用户
  async createUser(data: any) {
    const user = await User.create(data);
    return user;
  }

  // 为用户分配角色
  async assignRole(userId: bigint, roleId: bigint) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('用户不存在');
    
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error('权限不存在');

    // await user.setRole(role);
  }

  // 修改用户的角色
  async changeRole(userId: bigint, newRoleId: bigint) {
    return this.assignRole(userId, newRoleId);
  }

  // 删除用户
  async deleteUser(userId: bigint) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('用户不存在');
    
    await user.destroy();
  }
}

export default new UserService();
