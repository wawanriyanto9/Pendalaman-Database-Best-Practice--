import dbfire  from './firebaseDB'

export type Layanan = {
  nama_layanan: string;
  operator: string;
  jenis_layanan: string;
  kode_layanan: string;
};



const layananRef = dbfire.collection('layanans');


export class LayananClient {
  private db: FirebaseFirestore.Firestore;
  private layananRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;


constructor() {
  this.db= dbfire;
  this.layananRef = layananRef;
}
  
async addlayanan(layanan: Layanan){
  try {
    await layananRef.add(layanan);
  
  } catch (error) {
    throw error
  }}


async getlayananAll(){
  let snapshot;
  try {
    snapshot = await this.layananRef.get();
   
  } catch (error) {
    throw error
  }console.log(snapshot);
  //return snapshot.docs.map(doc => doc.data()); // data doang
  return snapshot.docs.map(doc => {return {...doc.data(), id: doc.id} }); // data+ id
}

async getlayananByKode(codeservice: string){
  let snapshot;
  try {
    snapshot = await layananRef.where ('kode_layanan','==', codeservice).get();
  } catch (error) {
    throw error
  }
  return snapshot.docs.map(doc => doc.data());
}

async deleteLayanan(id: string){
  try {
    await layananRef.doc(id).delete();
  
  } catch (error) {
    throw error
  }
  return;
}

async UpdateLayanan(id: string, update: Object){
  let snapshot;
  try {
    await layananRef.doc(id).update({
      ...update
    });
    snapshot = await layananRef.doc(id).get();
  } catch (error) {
    throw error;
  }

  return snapshot.data();
}




}