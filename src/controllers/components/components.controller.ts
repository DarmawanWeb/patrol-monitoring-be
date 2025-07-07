import type { Request, Response } from 'express';
import ComponentService from '@/services/components/component.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new ComponentService();

export const createComponentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createComponent(req.body);
    res.status(201).json({
      message: 'Component created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllComponentsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllComponents();
    res.status(200).json({
      message: 'All components retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getComponentById(id);
    res.status(200).json({
      message: 'Component retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateComponentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updateComponent(id, req.body);
    res.status(200).json({
      message: `Component with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteComponentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteComponent(id);
    res.status(200).json({
      message: `Component with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
