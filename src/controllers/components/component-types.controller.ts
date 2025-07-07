// src/controllers/components/component-types.controller.ts

import type { Request, Response } from 'express';
import ComponentTypeService from '@/services/components/component-type.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new ComponentTypeService();

export const createComponentTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await service.createComponentType(req.body);
    res.status(201).json({
      message: 'Component type created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllComponentTypesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllComponentTypes();
    res.status(200).json({
      message: 'All component types retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getComponentTypeByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getComponentTypeById(id);
    res.status(200).json({
      message: 'Component type retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateComponentTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.updateComponentType(id, req.body);
    res.status(200).json({
      message: `Component type with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteComponentTypeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteComponentType(id);
    res.status(200).json({
      message: `Component type with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
