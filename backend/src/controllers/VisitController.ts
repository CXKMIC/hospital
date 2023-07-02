// VisitController.ts
import { Context } from 'koa';
import VisitService from '../services/VisitService';
import response from '../common/utils/response';
import { Rules } from 'async-validator';
import validate from '../common/utils/validate';

class VisitController {
  visitService: VisitService;

  constructor() {
    this.visitService = new VisitService();
  }

  // 获取所有出诊
  async getVisits(ctx: Context) {
    try {
      const visits = await this.visitService.getVisits();
      return response.success(ctx, visits);
    } catch (err) {
      console.error(err);
      return response.fail(ctx, 'Internal server error', [], 500);
    }
  }

  // 创建出诊
  async createVisit(ctx: Context) {
    const rules: Rules = {
      doctor_id: {
        type: 'string',
        required: true,
      },
      // 其他字段规则...
    };

    const { data, error } = await validate(ctx, rules);
    if (error) {
      return response.fail(ctx, 'Invalid data', error, 400);
    }

    try {
      const visit = await this.visitService.createVisit(data);
      return response.success(ctx, visit);
    } catch (err) {
      console.error(err);
      return response.fail(ctx, 'Internal server error', [], 500);
    }
  }

  // 更新出诊信息
  async updateVisit(ctx: Context) {
    const { id } = ctx.params;
    const rules: Rules = {
      doctor_id: {
        type: 'string',
        required: true,
      },
      // 其他需要更新的字段...
    };
    
    const { data, error } = await validate(ctx, rules);
    if (error) {
      return response.fail(ctx, 'Invalid data', error, 400);
    }

    try {
      const updatedVisit = await this.visitService.updateVisit(id, data);
      return response.success(ctx, updatedVisit);
    } catch (err) {
      console.error(err);
      return response.fail(ctx, 'Internal server error', [], 500);
    }
  }

  // 删除出诊
  async deleteVisit(ctx: Context) {
    const { id } = ctx.params;

    try {
      const result = await this.visitService.deleteVisit(id);
      return response.success(ctx, result);
    } catch (err) {
      console.error(err);
      return response.fail(ctx, 'Internal server error', [], 500);
    }
  }
}

export default new VisitController();