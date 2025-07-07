import type { Request, Response } from 'express';
import ComponentDetailService from '@/services/components/component-detail.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new ComponentDetailService();

export const createComponentDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createComponentDetail(req.body);
    res.status(201).json({
      message: 'Component detail created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllComponentDetailsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllComponentDetails();
    res.status(200).json({
      message: 'All component details retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentDetailBySerialNumberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const serialNumber = String(req.params.serialNumber || '');
    const result = await service.getComponentDetailBySerialNumber(serialNumber);
    res.status(200).json({
      message: 'Component detail retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentDetailsByComponentIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const componentId = parseInt(req.params.componentId || '0');
    const result = await service.getComponentDetailsByComponentId(componentId);
    res.status(200).json({
      message: 'Component details retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateComponentDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const serialNumber = String(req.params.serialNumber || '');
    const result = await service.updateComponentDetail(serialNumber, req.body);
    res.status(200).json({
      message: `Component detail with serial number ${serialNumber} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteComponentDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const serialNumber = String(req.params.serialNumber || '');
    await service.deleteComponentDetail(serialNumber);
    res.status(200).json({
      message: `Component detail with serial number ${serialNumber} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
