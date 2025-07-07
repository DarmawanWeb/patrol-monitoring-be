// src/controllers/components/component-maintenance-log.controller.ts

import type { Request, Response } from 'express';
import ComponentMaintenanceLogService from '@/services/components/component-maintenace-log.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new ComponentMaintenanceLogService();

export const createComponentMaintenanceLogController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createComponentMaintenanceLog(req.body);
    res.status(201).json({
      message: 'Component maintenance log created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllComponentMaintenanceLogsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllComponentMaintenanceLogs();
    res.status(200).json({
      message: 'All component maintenance logs retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentMaintenanceLogByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getComponentMaintenanceLogById(id);
    res.status(200).json({
      message: 'Component maintenance log retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentMaintenanceLogsBySerialNumberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const componentSerialNumber = String(req.params.serialNumber || '');
    const result = await service.getComponentMaintenanceLogsBySerialNumber(
      componentSerialNumber,
    );
    res.status(200).json({
      message: 'Component maintenance logs retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateComponentMaintenanceLogController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updateComponentMaintenanceLog(id, req.body);
    res.status(200).json({
      message: `Component maintenance log with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteComponentMaintenanceLogController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteComponentMaintenanceLog(id);
    res.status(200).json({
      message: `Component maintenance log with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
