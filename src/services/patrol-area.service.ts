// import PatrolArea from '@/database/models/patrol/PatrolArea.js';
// import { NotFoundError } from '@/utils/base.error.js';
// import {
//   CreatePatrolAreaData,
//   UpdatePatrolAreaData,
//   PatrolAreaResponse,
// } from '@/types/patrol-area.js';

// class PatrolAreaService {
//   createPatrolArea = async (
//     data: CreatePatrolAreaData,
//   ): Promise<PatrolAreaResponse> => {
//     const patrolArea = await PatrolArea.create({
//       name: data.name,
//       image: data.image,
//       mapCenterLat: data.mapCenterLat,
//       mapCenterLng: data.mapCenterLng,
//       description: data.description,
//       address: data.address,
//       cargingDockLat: data.cargingDockLat,
//       cargingDockLng: data.cargingDockLng,
//       cargingDockYaw: data.cargingDockYaw,
//     });

//     return patrolArea.toJSON();
//   };

//   getPatrolAreaById = async (id: number): Promise<PatrolAreaResponse> => {
//     const patrolArea = await PatrolArea.findByPk(id);
//     if (!patrolArea) {
//       throw new NotFoundError('Patrol Area not found');
//     }
//     return patrolArea.toJSON();
//   };

//   getAllPatrolAreas = async (): Promise<PatrolAreaResponse[]> => {
//     const patrolAreas = await PatrolArea.findAll();
//     return patrolAreas.map((area) => area.toJSON());
//   };

//   updatePatrolArea = async (
//     id: number,
//     data: UpdatePatrolAreaData,
//   ): Promise<PatrolAreaResponse> => {
//     const patrolArea = await PatrolArea.findByPk(id);
//     if (!patrolArea) {
//       throw new NotFoundError('Patrol Area not found');
//     }

//     await patrolArea.update(data);
//     return patrolArea.toJSON();
//   };

//   deletePatrolArea = async (id: number): Promise<{ message: string }> => {
//     const patrolArea = await PatrolArea.findByPk(id);
//     if (!patrolArea) {
//       throw new NotFoundError('Patrol Area not found');
//     }

//     await patrolArea.destroy();
//     return { message: 'Patrol Area deleted successfully' };
//   };
// }

// export default PatrolAreaService;
