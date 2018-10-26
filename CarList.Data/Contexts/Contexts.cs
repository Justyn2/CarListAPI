
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace CarList.Data.Contexts
{
    public class DataStoreObject
    {
        public string Id { get; set; }
        public bool IsDeleted { get; set; }

    }

    public interface IContext<T> where T : DataStoreObject
    {
        void Save(T data);
        T GetById(string id);
        List<T> GetAll();
        void Delete(string id);
        void Update(string id, T data);

    }

    public class JsonContext<T> : IContext<T> where T : DataStoreObject
    {
        private readonly string _filePath;
        
        public JsonContext(string filePath)
        {
            _filePath = filePath;
            if (!File.Exists(_filePath))
            {
                var stream = File.Create(_filePath);
                stream.Close();
            }
        }

        private List<T> Read()
        {
            var list = JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(_filePath));
            list = list ?? new List<T>();
            return list;
        }

        private void Write(List<T> models)
        {
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(models));
        }

        public void Save(T data)
        {
            var json = JsonConvert.SerializeObject(data);
            var newData = JsonConvert.DeserializeObject<T>(json);
            
            if (string.IsNullOrEmpty(data.Id))
            {
                newData.Id = Guid.NewGuid().ToString(); 
            }
            newData.IsDeleted = false;
            WriteChangesToItem(newData);
        }

        public void Update(string id, T data)
        {
            var json = JsonConvert.SerializeObject(data);
            var newData = JsonConvert.DeserializeObject<T>(json);
            newData.Id = id;
            newData.IsDeleted = false;
            WriteChangesToItem(newData);
        }

        public T GetById(string id)
        {
            var data = Read().FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            return data;
        }

        public List<T> GetAll()
        {
            var data = Read().FindAll(x=>!x.IsDeleted);
            return data;
        }

        public void Delete(string id)
        {
           var data = Read();
           var result = data.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (result != null)
            {
                result.IsDeleted = true;
                WriteChangesToItem(result);
            }
        }

        private void WriteChangesToItem(T data)
        {
            var entireFile = Read();
            var oldData = entireFile.FirstOrDefault(x => data.Id == x.Id);
            if (oldData != null)
            {
                var index = entireFile.IndexOf(oldData);
                entireFile[index] = data;
            } 
            else
            {
                entireFile.Add(data);
            }
            Write(entireFile);
        }
    }

}